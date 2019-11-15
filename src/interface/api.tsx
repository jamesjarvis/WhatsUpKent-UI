import axios from 'axios';
import {
  getSundayDate, Filter, spaceSeparatedList, commaSeparatedStrings, RoomFilterState,
} from './utils';
import { DBEvent, Module, Location } from './db-types';

// const API_URL = 'https://api.whatsupkent.com/';
const API_URL = 'http://localhost:4000';

export async function getAllThisWeek(d: Date): Promise<DBEvent[] | null> {
  const sundayDate = getSundayDate(d);
  const saturdayDate = new Date(sundayDate);
  saturdayDate.setDate(sundayDate.getDate() + 6);
  const query = `
  {
    weekView(func: has(event.title), orderasc: event.start_date) @filter(gt(event.start_date,${sundayDate.toISOString().split('T')[0]}) and le(event.end_date, ${saturdayDate.toISOString().split('T')[0]})){
      id: event.id
      startDate: event.start_date
      endDate: event.end_date
      title: event.title
      description: event.description
      location: event.location {
        id: location.id
        name: location.name
        disabledAccess: location.disabled_access
      }
      organiser: event.organiser {
        name: person.name
        email: person.email
      }
      module: event.part_of_module {
        code: module.code
        name: module.name
        subject: module.subject
      }
    }
  }
  `;
  try {
    const response = await axios.post(API_URL, query);
    const body: {weekView: Array<DBEvent>} = response.data;
    return body.weekView;
  } catch (error) {
    return null;
  }
}

export async function getFilteredThisWeekExact(f: Filter): Promise<DBEvent[] | null> {
  const moduleCodes = f.subjects.length > 0 ? `@filter(eq(module.subject, [${commaSeparatedStrings(f.subjects)}]))` : '';
  const eventTerms = f.eventTypes.length > 0 ? `and anyofterms(event.title, "${spaceSeparatedList(f.eventTypes)}")` : '';
  const query = `
{filteredWeekView(func: has(module.subject), orderasc: module.subject, orderasc: module.code, first: 2000) ${moduleCodes}{
code: module.code
subject: module.subject
name: module.name
events: ~event.part_of_module @filter(gt(event.start_date,${f.startDate.toISOString().split('T')[0]}) and le(event.end_date, ${f.endDate.toISOString().split('T')[0]}) ${eventTerms}) {
  id: event.id
  title: event.title
  description: event.description
  startDate: event.start_date
  endDate: event.end_date
  location: event.location {
    name: location.name
    id: location.id
    disabledAccess: location.disabled_access
}}}}
  `;
  try {
    const response = await axios.post(API_URL, query, { headers: { 'Content-Type': 'application/json' } });
    const body: {filteredWeekView: Array<Module>} = response.data;
    const events = new Array<DBEvent>();
    body.filteredWeekView.forEach((mod: Module) => {
      if (mod.events) {
        const tempMod: Module = {
          code: mod.code,
          name: mod.name,
          subject: mod.subject,
        };
        mod.events.forEach((event) => {
          const tempEvent = event;
          tempEvent.module = [tempMod];
          events.push(tempEvent);
        });
      }
    });
    return events;
  } catch (error) {
    return null;
  }
}

export async function getAllModules(): Promise<Module[] | null> {
  const query = `
  {
    modules(func: has(module.subject), orderasc: module.subject, orderasc: module.code) {
      subject: module.subject
      code: module.code
      name: module.name
    }
  }
  `;
  try {
    const response = await axios.post(API_URL, query, { headers: { 'Content-Type': 'application/json' } });
    const body: {modules: Array<Module>} = response.data;
    return body.modules;
  } catch (error) {
    return null;
  }
}

export async function getAllSubjects(): Promise<string[] | null> {
  const query = `
  {subjects(func: has(module.subject), orderasc: module.subject, first: 4000){subject: module.subject}}`;
  try {
    const response = await axios.post(API_URL, query, { headers: { 'Content-Type': 'application/json' } });
    const body: {subjects: Array<{subject: string}>} = response.data;
    const temp = new Array<string>();
    body.subjects.forEach((thing) => {
      if (!temp.includes(thing.subject)) {
        temp.push(thing.subject);
      }
    });
    return temp;
  } catch (error) {
    return null;
  }
}

export async function getRooms(f: RoomFilterState): Promise<Array<Location> | null> {
  const query = `
  {
    var(func: eq(event.start_date,"${f.startDate.toISOString().split('T')[0]}")) @filter(not (lt(event.start_date, "${f.startDate.toISOString()}")and le(event.end_date, "${f.startDate.toISOString()}"))or(ge(event.start_date,"${f.endDate.toISOString()}")and(gt(event.end_date,"${f.startDate.toISOString()}"))))  {
      locations as event.location  { 
        location.id
      }
    }
      
    availableLocations(func: has(location.id), orderasc: location.id) @filter(not uid(locations)) {
      id: location.id
      name: location.name
      disabledAccess: location.disabled_access
    }
  }
  `;
  try {
    const response = await axios.post(API_URL, query, { headers: { 'Content-Type': 'application/json' } });
    const body: {availableLocations: Array<Location>} = response.data;
    return body.availableLocations;
  } catch (error) {
    return null;
  }
}


export function getAllLectureTypes(): Array<string> {
  return ['LECTURE', 'SEMINAR', 'PRESENTATION', 'LAB', 'INDUCTION', 'PC', 'WORKSHOP', 'BOOKING', 'MEETING', 'PERFORMANCE', 'SCREENING', 'LECSEM', 'FIELDTRIP'];
}
