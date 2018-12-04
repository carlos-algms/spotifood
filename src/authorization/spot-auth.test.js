import spotAuth from './spot-auth';

it('Generates the correct url', () => {
  let expectedUrl = `${spotAuth.getTokenUrl}?client_id=${spotAuth.clientId}`;
  expectedUrl += `&redirect_uri=${spotAuth.appUrl}&response_type=token`;
  expect(spotAuth.generateAuthUrl()).toEqual(expectedUrl);
});

it('Redirect the browser', () => {
  const testUrl = '/test-url';
  const generateAuthUrl = jest.spyOn(spotAuth, 'generateAuthUrl');
  jest.spyOn(window.location, 'assign');
  generateAuthUrl.mockReturnValue(testUrl);

  spotAuth.redirectToAutorize();

  expect(window.location.assign).toHaveBeenCalledWith(testUrl);
});
