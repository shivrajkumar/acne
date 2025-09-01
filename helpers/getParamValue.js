export const getParamValue = (url, key) => {
  const urlSearchParams = new URLSearchParams(new URL(url).search);
  const idValue = urlSearchParams.get(key);
  return idValue || null;
};
