export const generateUniqueTimestamp = () => {
  const date = new Date();
  const timestamp = date.getTime();
  const counter = Math.floor(Math.random() * 1000);
  return timestamp + '_' + counter;
};
