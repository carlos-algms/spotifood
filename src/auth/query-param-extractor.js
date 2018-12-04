const hashParamsReducer = (params, hashParam): string[] => {
  const param = hashParam.split('=');
  if (param.length >= 2) {
    params.push(param);
  }

  return params;
};

const getParamsMap = (hash: string = global.location.hash) =>
  new Map(
    hash
      .replace(/^#/, '')
      .split('&')
      .reduce(hashParamsReducer, [])
  );

export default getParamsMap;
