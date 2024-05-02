import { type Employee } from '../db/db'

export const isValidId = (id: unknown) => typeof id === 'number' && id > 0;

export const cleanArray = (list: Employee[]) => {
  const seenIds = new Set<number>();

  const cleanedArray = list.filter(employee => {
    if (!isValidId(employee.id) || seenIds.has(employee.id)) {
      return false;
    }
    seenIds.add(employee.id);

    const validManagerId = employee.managerId === 0 || isValidId(employee.managerId);

    return validManagerId 
  });

  console.log(cleanedArray)
  return cleanedArray;
}