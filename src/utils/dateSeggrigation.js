export const segregateSessions = (data, today = new Date()) => {
  const desiredToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  ); // Specify the desired "today" date
  const yesterday = new Date(desiredToday.getTime() - 1000 * 60 * 60 * 24); // Yesterday's date
  const pastWeekStart = new Date(
    desiredToday.getTime() - 1000 * 60 * 60 * 24 * 7
  ); // Start of past week
  const pastMonthStart = new Date(
    desiredToday.getTime() - 1000 * 60 * 60 * 24 * 30
  ); // Start of past month

  const sessionsToday = [];
  const sessionsYesterday = [];
  const sessionsPastWeek = [];
  const sessionsPastMonth = [];
  for (const session of data) {
    const createdAt = new Date(session.updated_at);
    const createdDate = createdAt.toLocaleDateString();

    if (createdDate === desiredToday.toLocaleDateString()) {
      sessionsToday.push(session);
    } else if (createdDate === yesterday.toLocaleDateString()) {
      sessionsYesterday.push(session);
    } else if (
      pastWeekStart.getTime() <= createdAt.getTime() &&
      createdAt.getTime() < desiredToday.getTime()
    ) {
      sessionsPastWeek.push(session);
    } else if (
      pastMonthStart.getTime() <= createdAt.getTime() &&
      createdAt.getTime() < pastWeekStart.getTime()
    ) {
      sessionsPastMonth.push(session);
    }
  }

  return {
    today: sessionsToday,
    yesterday: sessionsYesterday,
    past_7_days: sessionsPastWeek,
    past_30_days: sessionsPastMonth,
  };
};
