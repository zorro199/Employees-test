import { ChangeEvent, MouseEventHandler, useState } from 'react'
import styles from './EmployeeCard.module.scss'
import { useUpdateEmployeeMutation } from '../store/api/employeeApi'
import { useLocation, useNavigate } from 'react-router-dom'
import { IEmployee } from '../types/types'


const EmployeeCard = () => {
    const [employeeData, setEmployeeData] = useState({
        name: '',
        phone: '',
        birthday: ''
    })
    const [selectEmployee, setSelectEmployee] = useState('cook')
    const [isArchive, setIsArchive] = useState<boolean>()
    const navigate = useNavigate()

    const data = useLocation().state as IEmployee

    const [updateEmployee, {isSuccess}] = useUpdateEmployeeMutation()

    const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>, param: string) => {
        setEmployeeData(prev => ({...prev, [param]: e.target.value}))
    }

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectEmployee(e.target.value)
    }

    const handleCheckedInput = (e: ChangeEvent<HTMLInputElement>) => {
        setIsArchive(e.target.checked)
    }

    const handleUpdateEmployee: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        navigate('/')
        try {
            await updateEmployee({
                id: data?.id,
                name: employeeData.name,
                phone: employeeData.phone,
                birthday: employeeData.birthday,
                isArchive: isArchive,
                role: selectEmployee
            }).unwrap()
        } catch (error) {
            console.log('error - ' , error)
        }
        if (isSuccess) {
            setEmployeeData({
                    name: '',
                    phone: '',
                    birthday: ''
                })
        }
    }

    return (
        <div className={styles.card}>
            <header className={styles.header}>Редактировать данные {data?.name}</header>
            <form className={styles.setting_form}>
                <input type="text" 
                       placeholder='Имя' 
                       className={styles.input_data} 
                       onChange={(e) => inputChangeHandle(e, 'name')} />
                <input type="text" 
                       placeholder='Телефон' 
                       className={styles.input_data} 
                       onChange={(e) => inputChangeHandle(e, 'phone')} />
                <input type="text" 
                       placeholder='Дата рождения' 
                       className={styles.input_data} 
                       onChange={(e) => inputChangeHandle(e, 'birthday')} />
                       
             <div className={styles.filter}>
               <div className={styles.box_select}>
                  <select onChange={handleSelectChange}>
                    <option value='cook'>Повар</option>
                    <option value="waiter">Официант</option>
                    <option value='driver'>Водитель</option>
                  </select>
                </div>
                <div className={styles.check_box}>
                    <label className={styles.container}>В архиве
                        <input type="checkbox" checked={isArchive} onChange={handleCheckedInput}/>
                        <span className={styles.checkmark}></span>
                    </label>
                </div>
            </div>
            <button onClick={handleUpdateEmployee}>Измениь</button>        
            </form>
        </div>
    )
}
export default EmployeeCard