// @flow
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

  redirectToAutorize() {
    window.location.assign(this.generateAuthUrl());
  }

  isAuthorized(): boolean {
    if (!this.hasValidToken) {
      this.extractTokenFromUrl();
    }

    if (!this.hasValidToken) {
      this.restoreTokenFromStorage();
    }

    return this.hasValidToken;
  }

  generateAuthUrl(): string {
    return `${this.getTokenUrl}?client_id=${this.clientId}&redirect_uri=${this.appUrl}&response_type=token`;
  }

  extractTokenFromUrl(): boolean {
    const paramsMap = getParamsMap();
    this.accessToken = paramsMap.get('access_token');
    this.tokenType = paramsMap.get('token_type');

    if (!this.hasValidToken) {
      return false;
    }

    this.storeToken();
    return true;
  }

  storeToken() {
    const tokenData = {
      accessToken: this.accessToken,
      tokenType: this.tokenType,
    };

    localStorage.setItem('auth-token', JSON.stringify(tokenData));
  }

  restoreTokenFromStorage() {
    const storedTokenData = localStorage.getItem('auth-token') || '{}';
    const { accessToken, tokenType } = JSON.parse(storedTokenData);

    if (!accessToken || !tokenType) {
      return false;
    }

    this.accessToken = accessToken;
    this.tokenType = tokenType;
    return true;
  }
}

const spotAuth = new SpotAuth();

export default spotAuth;
