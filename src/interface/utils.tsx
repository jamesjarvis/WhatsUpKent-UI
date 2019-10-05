export function getMondayDate(d: Date) {
  d = new Date(d);
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  let day = d.getDay(),
    diff = d.getDate() - day + (day === 0? -6:1);//adjust when day is sunday
  return new Date(d.setDate(diff));
}
