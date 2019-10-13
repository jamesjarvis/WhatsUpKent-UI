export interface Error {
  Status: string;
  Error: string;
}

export interface Module {
  code: string;
  name?: string;
  subject?: string;
  events?: Array<DBEvent>;
}

export interface Person {
  name?: string;
  email?: string;
}

export interface Location {
  id: string;
  name?: string;
  disabledAccess?: boolean;
}

export interface Scrape {
  id: number;
  lastScraped?: Date;
  foundEvent?: Array<DBEvent>;
}

export interface DBEvent {
  id: string;
  title?: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  organiser?: [Person];
  module?: [Module];
  location?: [Location];
}
