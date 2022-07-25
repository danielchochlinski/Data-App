export const uniqueID = () => {
  const uniq = "id" + new Date().getTime();
  return uniq;
};
