import getParamsMap from './query-param-extractor';

it('Should generate an empty Map if no hash provided', () => {
  const paramsMap = getParamsMap('');
  expect(paramsMap.size).toEqual(0);
});

it('Should extract all params on a hash as a Map', () => {
  const paramsMap = getParamsMap('#token=123&type=test');

  expect(paramsMap.get('token')).toEqual('123');
  expect(paramsMap.get('type')).toEqual('test');
});
