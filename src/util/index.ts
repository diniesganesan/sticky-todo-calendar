export interface ICalanderDates {
  date: number;
  day: string;
  notes?: INotes[];
}

export interface INotes {
  description: string;
  bulletColor: string;
}

const generateCalendarDates = (year: number, month: number) => {
  let firstDate = new Date(year, month, 1);
  let dates: ICalanderDates[] = [];

  while (firstDate.getMonth() === month) {
    dates.push({
      date: firstDate.getDate(),
      day: convertNumDayToText(firstDate.getDay()),
    });
    const inc = firstDate.getDate() + 1;
    firstDate.setDate(inc);
  }

  return dates;
};

const convertNumDayToText = (day: number) => {
  return days[day as keyof typeof days];
};

const fillInDates = (
  dates: {
    date: number;
    day: string;
    notes?: {};
  }[]
) => {
  if (dates.length === 0) return;

  Object.entries(days).forEach(([key, val]) => {
    //fill in 6X5 calendar

    //before 1st of the mmonth
    if (val === dates.at(0)!.day && Number(key) >= 0) {
      for (let i = Number(key) - 1; i >= 0; i--) {
        dates.unshift({
          date: 0,
          day: days[i as keyof typeof days],
        });
      }
    }

    //after 30/31 of the month
    if (val === dates.at(dates.length - 1)!.day && Number(key) >= 0) {
      for (let i = Number(key) + 1; i <= 6; i++) {
        dates.push({
          date: 0,
          day: days[i as keyof typeof days],
        });
      }
    }
  });

  return dates;
};

const saveCalendarDates = (month: string, calendarDates: ICalanderDates[]) => {
  if (!calendarDates) return;
  const local = localStorage.getItem('notes');
  if (local) {
    let exist: { month: string; calendarDates: ICalanderDates[] }[] =
      JSON.parse(local) as {
        month: string;
        calendarDates: ICalanderDates[];
      }[];
    const index = exist.findIndex(
      (el: { month: string; calendarDates: ICalanderDates[] }) =>
        el.month === month
    );

    if (index > -1) {
      exist[index] = {
        month,
        calendarDates,
      };
      localStorage.setItem('notes', JSON.stringify(exist));
      return;
    }

    exist = [...exist, { month, calendarDates }];
    localStorage.setItem('notes', JSON.stringify(exist));
    return;
  }

  localStorage.setItem('notes', JSON.stringify([{ month, calendarDates }]));
};

const retrieveCalendarDates = (month: string) => {
  if (!month) return;
  const local = localStorage.getItem('notes');
  if (!local) return;
  const exist = JSON.parse(local) as {
    month: string;
    calendarDates: ICalanderDates[];
  }[];

  const index = exist.findIndex(
    (el: { month: string; calendarDates: ICalanderDates[] }) =>
      el.month === month
  );
  if (index > -1) return exist[index].calendarDates;

  return;
};

const clearStorage = () => {
  localStorage.removeItem('notes');
};

const days = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thur',
  5: 'Fri',
  6: 'Sat',
};

const months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

const colors = {
  daysBg: '#444545',
  datesBg: '#B5FFE9',
  fontColor: '#FFFFFF',
  monthsBg: '#CEABB1',
  stickyNoteBg: '#C5E0D8',
};

export {
  convertNumDayToText,
  generateCalendarDates,
  fillInDates,
  saveCalendarDates,
  retrieveCalendarDates,
  clearStorage,
  days,
  months,
  colors,
};
