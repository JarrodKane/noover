import {Table} from './components/table'
import './App.css'
import {employeesBroken, employees} from './db/db'

function App() {

  return (
    <>
      <h1>Employees</h1>
      <Table list={employees} />
      <h1>Broken Employees</h1>
      <Table list={employeesBroken} />
    </>
  )
}

export default App
