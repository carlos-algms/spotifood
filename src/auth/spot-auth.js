// @flow
import axios from 'axios';

import getParamsMap from './query-param-extractor';

class SpotAuth implements AuthProvider {
  clientId = '92714faebfcf47fd85c7be69a5818aff';

  getTokenUrl = 'https://accounts.spotify.com/authorize';

  appUrl = `${window.location.href}auth-return`;

  accessToken = '';

  tokenType = '';

  get hasValidToken(): boolean {
    return this.accessToken && this.tokenType;
  }

  /**
   * Redirects the browser to the Authorization provider
   */
  redirectToAutorize() {
    window.location.assign(this.generateAuthUrl());
  }

  /**
   * Verifies if this app has authorization token
   * It tries to fetch from the URL and from the browser`s local storage
   */
  isAuthorized(): boolean {
    if (!this.hasValidToken) {
      this.extractTokenFromUrl();
    }

    if (!this.hasValidToken) {
      this.restoreTokenFromStorage();
    }

    return this.hasValidToken;
  }

  /**
   * Generates an URL point to the authorization provider
   */
  generateAuthUrl(): string {
    return `${this.getTokenUrl}?client_id=${this.clientId}&redirect_uri=${this.appUrl}&response_type=token`;
  }

  /**
   * Extracts token data from the URL hash.
   * The data would only be available after a redirect from the Authorization provider
   */
  extractTokenFromUrl(): boolean {
    const paramsMap = getParamsMap();

    this.accessToken = paramsMap.get('access_token');
    this.tokenType = paramsMap.get('token_type');

    if (!this.hasValidToken) {
      return false;
    }

    this.storeToken();
    this.setAuthHeader();
    return true;
  }

  /**
   * Stores the token retrieved from the URL on the Browser`s local storage
   */
  storeToken() {
    const tokenData = {
      accessToken: this.accessToken,
      tokenType: this.tokenType,
    };

    localStorage.setItem('auth-token', JSON.stringify(tokenData));
  }

  /**
   * Tries to restore token from browser`s local storage
   */
  restoreTokenFromStorage() {
    const storedTokenData = localStorage.getItem('auth-token') || '{}';
    const { accessToken, tokenType } = JSON.parse(storedTokenData);

    if (!accessToken || !tokenType) {
      return false;
    }

    this.accessToken = accessToken;
    this.tokenType = tokenType;
    this.setAuthHeader();
    return true;
  }

  /**
   * Sets the Authorization header to all requests
   */
  setAuthHeader() {
    axios.defaults.headers.common.Authorization = `${this.tokenType} ${this.accessToken}`;
  }
}

const spotAuth = new SpotAuth();

export default spotAuth;
