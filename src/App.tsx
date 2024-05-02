// import { useState } from 'react'
import {Table} from './components/table'
import './App.css'
import {employeesBroken, employees} from './db/db'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <h1>Table</h1>
      <Table list={employees} />
    </>
  )
}

export default App
