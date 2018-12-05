import axios from 'axios';

import spotAuth from './spot-auth';
import getParamsMap from './query-param-extractor';

jest.mock('./query-param-extractor');

const paramMapMock = new Map();
paramMapMock.set('access_token', '123');
paramMapMock.set('token_type', 'test');
getParamsMap.mockImplementation(() => paramMapMock);

it('Generates the correct url', () => {
  let expectedUrl = `${spotAuth.getTokenUrl}?client_id=${spotAuth.clientId}`;
  expectedUrl += `&redirect_uri=${spotAuth.appUrl}&response_type=token`;
  expect(spotAuth.generateAuthUrl()).toEqual(expectedUrl);
});

it('Redirects the browser', () => {
  const testUrl = '/test-url';
  const generateAuthUrl = jest.spyOn(spotAuth, 'generateAuthUrl');
  jest.spyOn(window.location, 'assign');
  generateAuthUrl.mockReturnValue(testUrl);

  spotAuth.redirectToAutorize();

  expect(window.location.assign).toHaveBeenCalledWith(testUrl);
});

it('Should try to get the tokens from the URL and localStorage', () => {
  const urlSpy = jest.spyOn(spotAuth, 'extractTokenFromUrl');
  const storageSpy = jest.spyOn(spotAuth, 'restoreTokenFromStorage');

  getParamsMap.mockImplementationOnce(() => new Map());

  spotAuth.isAuthorized();

  expect(urlSpy).toHaveBeenCalled();
  expect(storageSpy).toHaveBeenCalled();
});

it('Should extract token from the URL', () => {
  spotAuth.extractTokenFromUrl();

  expect(spotAuth.accessToken).toEqual(paramMapMock.get('access_token'));
  expect(spotAuth.tokenType).toEqual(paramMapMock.get('token_type'));
  expect(axios.defaults.headers.common.Authorization).toEqual(`${spotAuth.tokenType} ${spotAuth.accessToken}`);
});

it('Should restore token from local storage', () => {
  spotAuth.accessToken = 'stored';
  spotAuth.tokenType = 'locally';

  spotAuth.storeToken();

  spotAuth.accessToken = '';
  spotAuth.tokenType = '';

  expect(spotAuth.hasValidToken).toBeFalsy();

  spotAuth.restoreTokenFromStorage();

  expect(spotAuth.hasValidToken).toBeTruthy();
  expect(spotAuth.accessToken).toEqual('stored');
  expect(spotAuth.tokenType).toEqual('locally');
});
