export function getSundayDate(d: Date): Date {
  const tempd = new Date(d);
  tempd.setHours(5);
  tempd.setMinutes(0);
  tempd.setSeconds(0);
  const day = tempd.getDay();
  const diff = tempd.getDate() - day;
  return new Date(tempd.setDate(diff));
}

export function getEndOfWeek(d: Date): Date {
  const tempd = new Date(d);
  tempd.setHours(5);
  tempd.setMinutes(0);
  tempd.setSeconds(0);
  const day = tempd.getDay();
  const diff = tempd.getDate() + (6 - day);
  return new Date(tempd.setDate(diff));
}

export function spaceSeparatedList(as: Array<SelectValueType>): string {
  let temp = '';
  as.forEach((s) => {
    temp = `${temp + s.value} `;
  });
  return temp;
}

export function commaSeparatedStrings(as: Array<SelectValueType>): string {
  let temp = '';
  for (let i = as.length - 1; i >= 0; i -= 1) {
    temp = `${temp}"${as[i].value}"`;
    if (i !== 0) {
      temp = `${temp},`;
    }
  }
  return temp;
}

function formatTime(d: Date): string {
  const minutes = String(d.getMinutes());
  return `${d.getHours()}:${minutes.padStart(2, '0')}`;
}

export function formatDateRangeString(start: Date | undefined, end: Date | undefined): string {
  if (!start || !end) {
    return '';
  }
  const startString = start.toDateString();
  const timeString = `${formatTime(start)} - ${formatTime(end)}`;
  return `${startString} ⋅ ${timeString}`;
}

export interface SelectValueType {
  label: string;
  value: string;
}
export interface Filter {
  startDate: Date;
  endDate: Date;
  subjects: Array<SelectValueType>;
  eventTypes: Array<SelectValueType>;
}
