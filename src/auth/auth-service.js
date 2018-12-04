import spotAuth from './spot-auth';

class AuthService {
  accessToken: string;

  tokenType: string;

  /**
   * @private
   */
  authProvider = spotAuth;

  /**
   * Verifies if the session is authorized.
   * It checks if accessToken and tokenType are not empty.
   * If they are not, try to fetch them from the URL, otherwise from the localStorage.
   */
  isAuthorized() {
    let isAuthorized = this.accessToken && this.tokenType;

    if (!isAuthorized) {
      isAuthorized =
    }

    return isAuthorized;
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
