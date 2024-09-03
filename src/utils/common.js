export const objectGetParamsToString = (o) => {
  const str = [];
  for (const p in o) {
    (o[p] || o[p] === "" || o[p] === 0) &&
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(o[p]));
  }
  return str.join("&");
};
