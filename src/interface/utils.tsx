export function getMondayDate(d: Date): Date {
  const tempd = new Date(d);
  tempd.setHours(5);
  tempd.setMinutes(0);
  tempd.setSeconds(0);
  const day = tempd.getDay();
  const diff = tempd.getDate() - day + (day === 0 ? -6 : 1);// adjust when day is sunday
  return new Date(tempd.setDate(diff));
}

export function getSundayDate(d: Date): Date {
  const tempd = new Date(d);
  tempd.setHours(5);
  tempd.setMinutes(0);
  tempd.setSeconds(0);
  const day = tempd.getDay();
  const diff = tempd.getDate() - day;
  return new Date(tempd.setDate(diff));
}

export function spaceSeparatedList(as: Array<string>): string {
  let temp = '';
  as.forEach((s) => {
    temp = `${temp + s} `;
  });
  return temp;
}

export interface Filter {
  startDate: Date;
  endDate: Date;
  moduleCodes: Array<string>;
  eventTypes: Array<string>;
}
