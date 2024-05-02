export interface Employee {
  id: number;
  name: string;
  managerId: number;
}

// I gave Jamie a managerId of 0 to represent the CEO
export const employees: Employee[] = [
  { id: 100, name: "Alan", managerId: 150 },
  { id: 220, name: "Martin", managerId: 100 },
  { id: 150, name: "Jamie", managerId: 0 },
  { id: 275, name: "Alex", managerId: 100 },
  { id: 400, name: "Steve", managerId: 150 },
  { id: 190, name: "David", managerId: 400 },
];


export const employeesBroken: Employee[] = [
  { id: 100, name: "Alan", managerId: 150 },
  { id: 220, name: "Martin", managerId: 100 },
  { id: 150, name: "Jamie", managerId: 0 },
  { id: 275, name: "Alex", managerId: 100 },
  { id: 400, name: "Steve", managerId: 150 },
  { id: 190, name: "David", managerId: 400 },
  { id: 430, name: "JamieGreat", managerId: 20000 }, // No Manager
  { id: 0, name: "IdOf1", managerId: 100 }, // Id of 0
  // @ts-expect-error needed for testing
  { id: "34", name: "StringId", managerId: 100 }, 
  // @ts-expect-error needed for testing
  { id: 190, name: "MangerIdString", managerId: "150" },
  { id: 220, name: "DuplicateMartin", managerId: 100 }, // Duplicate id
   // @ts-expect-error needed for a bad object 
  {name: 'NoId', managerId: 150},
  // @ts-expect-error needed for a bad object
  {},
];
