import spotAuth from './spot-auth';

class AuthService {
  /**
   * @private
   */
  authProvider = spotAuth;

  get accessToken() {
    return this.authProvider.accessToken;
  }

  get tokenType() {
    return this.authProvider.tokenType;
  }

  /**
   * Verifies if the session is authorized.
   * It checks if accessToken and tokenType are not empty.
   * If they are not, try to fetch them from the URL, otherwise from the localStorage.
   */
  isAuthorized() {
    return this.authProvider.isAuthorized();
  }

  /**
   * Redirects the browser to the Authenticator`s provider login page.
   */
  redirectToAutorize() {
    this.authProvider.redirectToAutorize();
  }
}

const authService = new AuthService();

export default authService;
