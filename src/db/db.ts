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


// Added in some broken data for testing
// What we are testing for
// 1. Duplicate id
// 2. ManagerId does not exist
// 3. Id of 0
// 4. Id is a string
// 5. ManagerId is a string
// 6. ManagerId is not a number
export const employeesBroken: Employee[] = [
  { id: 300, name: "InvalidManager", managerId: 1000 }, // ManagerId does not exist
  { id: 100, name: "Alan", managerId: 150 }, // Duplicate id
  { id: 100, name: "Alan", managerId: 150 }, 
  { id: 220, name: "Martin", managerId: 100 }, 
  { id: 150, name: "Jamie", managerId: 0 }, 
  { id: 0, name: "Alex", managerId: 100 }, // Id of 0
  //@ts-expect-error needed for testing
  { id: '400', name: "Steve", managerId: 150 }, // Id is a string 
  { id: 190, name: "David", managerId: 400 },
    //@ts-expect-error needed for testing a bad string
  { id: 690, name: "BadString", managerId: "noNumber" }
];

