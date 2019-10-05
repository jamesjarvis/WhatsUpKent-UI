import axios from 'axios';
import {getMondayDate} from './utils';
import {DBEvent} from './db-types';

export async function getAllThisWeek(d: Date) {
  const mondayDate = getMondayDate(d);
  const sundayDate = new Date(mondayDate);
  sundayDate.setDate(mondayDate.getDate() + 6);
  let query = `
  {
		weekView(func: has(event.title), orderasc: event.start_date) @filter(gt(event.start_date,${mondayDate.toISOString().split('T')[0]}) and le(event.end_date, ${sundayDate.toISOString().split('T')[0]})){
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
  console.log(query)
  try {
    const response = await axios.post('/query', query);
    const body: {weekView: Array<DBEvent>} = response.data
    return body
  } catch(error) {
    return null;
  }
}

