import React from 'react';

import { type Employee } from '../db/db'
import { cleanArray } from '../util/index'

interface ExtendedEmployee extends Employee {
  depth?: number;
  children?: ExtendedEmployee[];
}

interface Props {
  list: Employee[]
}


// Builds up a tree structure from the list of employees
// We keep track of depth for use with the table
// We also keep track of columnCount to know how many columns we need in the table
// Cleaning the array is done in the util function cleanArray, this is to remove duplicates, strings, and invalid managerIds
const createHierarchyTree = (list: ExtendedEmployee[]) => {
  let columnCount = 0;
  const cleanedArray = cleanArray(list)

  const buildHierarchy = (array: ExtendedEmployee[], parent: ExtendedEmployee | { id: number; children?: ExtendedEmployee[] }, depth: number) => {
    let hierarchyTree: Array<ExtendedEmployee> = [];
    parent = typeof parent !== 'undefined' ? parent : { id: 0 };
    depth = typeof depth !== 'undefined' ? depth : 0;


    const children = array.filter(employee => employee?.managerId === parent?.id);

    if (children.length) {
      if (parent.id === 0) {
        hierarchyTree = children;
      } else {
        parent['children'] = children;
      }
  
      children.forEach(child => {
        buildHierarchy(array, child, depth + 1);
        child.depth = depth + 1;
      });

      columnCount = Math.max(columnCount, depth + 1);
    }

    return hierarchyTree;
  }

  // This could be cleaner
  const hierarchy = buildHierarchy(cleanedArray, { id: 0 }, 0);

  return { hierarchy, columnCount };

}

export const Table: React.FC<Props> = ({ list }) => {
  const { hierarchy, columnCount } = createHierarchyTree(list)


  // Creates the td elements for the table
  // We check where the position of the filed td should be, if it is that position we fill it otherwise we give an empty td
  const createTd = (employee: ExtendedEmployee, positionOfEmp: number) => {
    const tdMade = Array.from({ length: columnCount }, (_, i) => (
      i === positionOfEmp ? <td key={employee.id}>{employee.name}</td> : <td key={i}></td>
    ));
    return tdMade;
  };

  const loopThroughHierarchy = (array: ExtendedEmployee[]) => {
    const jsxElements: JSX.Element[] = [];

    array.forEach((employee) => {
      if (!employee?.depth) return;

      jsxElements.push(<tr key={employee.id}>{createTd(employee, (employee?.depth - 1))}</tr>);

      // If the employee has children, recursively call loopThroughHierarchy on its children
      if (employee.children && employee.children.length > 0) {
        const childrenJsx = loopThroughHierarchy(employee.children);
        // Concatenate the JSX elements for children
        jsxElements.push(...childrenJsx);
      }
    });

    return jsxElements;
  };

  return (
    <table>
      <tbody>
        {loopThroughHierarchy(hierarchy)}
      </tbody>
    </table>
  );
}

