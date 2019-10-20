/* eslint-disable no-bitwise */
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


export function djb2(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
  }
  return hash;
}

export function getSubjectColour(str: string): string {
  const hash = djb2(str);
  // eslint-disable-next-line no-bitwise
  let r = (hash & 0xFF0000) >> 16;
  // eslint-disable-next-line no-bitwise
  let g = (hash & 0x00FF00) >> 8;
  // eslint-disable-next-line no-bitwise
  let b = hash & 0x0000FF;

  r = Math.min(r, 240);
  g = Math.min(g, 240);
  b = Math.min(b, 240);
  return `#${(`0${r.toString(16)}`).substr(-2)}${(`0${g.toString(16)}`).substr(-2)}${(`0${b.toString(16)}`).substr(-2)}`;
}


// Hash any string into an integer value
// Then we'll use the int and convert to hex.
export function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

// Convert an int to hexadecimal with a max length
// of six characters.
export function intToARGB(i: number): string {
  let hex = ((i >> 24) & 0xFF).toString(16)
          + ((i >> 16) & 0xFF).toString(16)
          + ((i >> 8) & 0xFF).toString(16)
          + (i & 0xFF).toString(16);
  // Sometimes the string returned will be too short so we
  // add zeros to pad it out, which later get removed if
  // the length is greater than six.
  hex += '000000';
  return hex.substring(0, 6);
}
