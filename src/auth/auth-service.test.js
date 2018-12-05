import authService from './auth-service';

it('Should delegate to auth provider class', () => {
  const authProviderMock = {
    isAuthorized: jest.fn(),
    redirectToAutorize: jest.fn(),
    accessToken: 1,
    tokenType: 2,
  };
  authService.authProvider = authProviderMock;

  authService.isAuthorized();
  authService.redirectToAutorize();

  expect(authProviderMock.isAuthorized).toHaveBeenCalled();
  expect(authProviderMock.redirectToAutorize).toHaveBeenCalled();
  expect(authService.accessToken).toEqual(authProviderMock.accessToken);
  expect(authService.tokenType).toEqual(authProviderMock.tokenType);
});
