import { Routes, Route } from 'react-router'
import Employees from './pages/employees/Employees'
import EmployeeCard from './employee-card/EmployeeCard'


const AppRouter = () => {
    return (
        <Routes>
        <Route path='/' element={<Employees />} />
        <Route path='employee/:id' element={<EmployeeCard />}/>
      </Routes>
    )
}
export default AppRouter