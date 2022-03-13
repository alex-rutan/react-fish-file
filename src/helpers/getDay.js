const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function getDayOfTheWeek(date) {
  const newDate = new Date(date);
  const dayIndex = newDate.getDay();

  return daysOfWeek[dayIndex];
}

export default getDayOfTheWeek;