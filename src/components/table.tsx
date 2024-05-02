import React from 'react';

import type { Employee } from '../db/db'

interface ExtendedEmployee extends Employee {
  depth: number;
  children?: ExtendedEmployee[];
}

interface Props {
  list: ExtendedEmployee[]
}

type HierarchyArray = Array<ExtendedEmployee>;

const createHierarchyTree = (list: HierarchyArray) => {
  let columnCount = 0;

  const buildHierarchy = (array: HierarchyArray, parent: ExtendedEmployee | { id: number; children?: ExtendedEmployee[] }, depth: number) => {
    let hierarchyTree: Array<ExtendedEmployee> = [];
    parent = typeof parent !== 'undefined' ? parent : { id: 0 };
    depth = typeof depth !== 'undefined' ? depth : 0;

    const children = array.filter(employee => employee.managerId === parent.id);

    if (children.length) {
      if (parent.id === 0) {
        hierarchyTree = children;
      } else {
        parent['children'] = children;
      }
      columnCount++;

      children.forEach(child => {
        buildHierarchy(array, child, depth + 1);
        child.depth = depth + 1;
      });
    }

    return hierarchyTree;
  }

  // This could be cleaner
  const hierarchy = buildHierarchy(list, { id: 0 }, 0);

  return { hierarchy, columnCount };

}

export const Table: React.FC<Props> = ({ list }) => {
  const { hierarchy, columnCount } = createHierarchyTree(list)

  // Create a table row with a td for each employee, it will insert an empty td if the employee is not in that column
  // that's why we pass in positionOfEmp to know where to put the employee is the row
  const createTd = (employee: ExtendedEmployee, positionOfEmp: number) => {
    const tdMade = Array.from({ length: columnCount - 1 }, (_, i) => (
      i === positionOfEmp ? <td key={employee.id}>{employee.name}</td> : <td key={i}></td>
    ));
    return tdMade
  }

  const loopThroughHierarchy = (array: ExtendedEmployee[]) => {
    const jsxElements: JSX.Element[] = [];

    array.forEach((employee) => {
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

