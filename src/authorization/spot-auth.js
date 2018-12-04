class SpotAuth {
  clientId = '92714faebfcf47fd85c7be69a5818aff';

  getTokenUrl = 'https://accounts.spotify.com/authorize';

  appUrl = `${window.location.href}auth-return`;

  redirectToAutorize() {
    window.location.assign(this.generateAuthUrl());
  }

  generateAuthUrl(): string {
    return `${this.getTokenUrl}?client_id=${this.clientId}&redirect_uri=${this.appUrl}&response_type=token`;
  }
}

const spotAuth = new SpotAuth();

export default spotAuth;
