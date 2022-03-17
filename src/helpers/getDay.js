const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

/** Function returns an abbreviated day of the week string
 *  according to an input day index.
 */

function getDayOfTheWeek(date) {
  const newDate = new Date(date);
  const dayIndex = newDate.getDay();

  return daysOfWeek[dayIndex];
}

export default getDayOfTheWeek;