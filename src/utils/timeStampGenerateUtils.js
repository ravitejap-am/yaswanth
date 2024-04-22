export const generateUniqueTimestamp = () => {
  const date = new Date();
  const timestamp = date.getTime();
  const counter = Math.floor(Math.random() * 1000);
  return timestamp + '_' + counter;
};


export const timeExtracter = (dateString) => {
  const dateTime = new Date(dateString);
  const timeString = dateTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  return timeString;
}
