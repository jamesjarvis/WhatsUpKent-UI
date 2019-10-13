import axios from 'axios';
import { getSundayDate } from './utils';
import { DBEvent, Module } from './db-types';

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
    const response = await axios.post('/query', query);
    const body: {weekView: Array<DBEvent>} = response.data;
    return body.weekView;
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
    const response = await axios.post('/query', query);
    const body: {modules: Array<Module>} = response.data;
    return body.modules;
  } catch (error) {
    return null;
  }
}

export function getAllLectureTypes(): Array<string> {
  return ['LECTURE', 'SEMINAR', 'PRESENTATION', 'LAB', 'INDUCTION', 'PC', 'WORKSHOP', 'BOOKING', 'MEETING', 'PERFORMANCE', 'SCREENING', 'LECSEM', 'FIELDTRIP'];
}
