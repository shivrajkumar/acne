export const getSearchParams = (searchParams) => {
  const params = {};

  if (searchParams) {
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
  }

  return params;
};
