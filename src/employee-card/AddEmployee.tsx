import { ChangeEvent, MouseEventHandler, useState } from 'react'
import styles from './EmployeeCard.module.scss'
import { useAddEmployeeMutation } from '../store/api/employeeApi'
import { useNavigate } from 'react-router-dom'


const EmployeeCard = () => {
    const [employeeData, setEmployeeData] = useState({
        name: '',
        phone: '',
        birthday: ''
    })
    const [selectEmployee, setSelectEmployee] = useState('cook')
    const [isArchive, setIsArchive] = useState<boolean>()
    const navigate = useNavigate()

    const [addEmployee, {isSuccess}] = useAddEmployeeMutation()

    const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>, param: string) => {
        setEmployeeData(prev => ({...prev, [param]: e.target.value}))
    }

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectEmployee(e.target.value)
    }

    const handleCheckedInput = (e: ChangeEvent<HTMLInputElement>) => {
        setIsArchive(e.target.checked)
    }

    const handleAddEmployee: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.stopPropagation()
        navigate('/')
        try {
            await addEmployee({
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
            <header className={styles.header}>Добавить сотрудника</header>
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
            <button onClick={handleAddEmployee}>Добавить</button>        
            </form>
        </div>
    )
}
export default EmployeeCard