export const pieRaw_data = {
    chat: [
        { value: 1048, name: 'Remaining' },
        { value: 735, name: 'Used' },
    ],
    users: [
        { value: 1148, name: 'Remaining' },
        { value: 635, name: 'Used' },
    ],
    documents: [
        { value: 1248, name: 'Remaining' },
        { value: 535, name: 'Used' },
    ],
    documents_size: [
        { value: 1348, name: 'Remaining' },
        { value: 435, name: 'Used' },
    ],
}


const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};


 const generateDummyData = () => {
  const currentDate = new Date();
  const lastYearDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
  const dummyData = [];

  let currentDateIterator = new Date(lastYearDate);
  while (currentDateIterator <= currentDate) {
    const formattedDate = `${currentDateIterator.getDate().toString().padStart(2, '0')}/${(currentDateIterator.getMonth() + 1).toString().padStart(2, '0')}/${currentDateIterator.getFullYear()}`;
    const chatCount = getRandomNumber(1, 150).toFixed(1); 
    const sessionCount = getRandomNumber(1, 200).toFixed(1);

    dummyData.push({
      chat_count: parseInt(chatCount),
      session_count: parseInt(sessionCount),
      date: formattedDate
    });

    currentDateIterator.setDate(currentDateIterator.getDate() + 1);
  }

  return dummyData;
};

export const barRaw_data = generateDummyData();

