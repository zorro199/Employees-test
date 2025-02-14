import { ChangeEvent, useState } from "react"
import { useEmployeeApi } from "../../hooks/useEmployeeApi"
import EmployeeItem from "../items/EmployeeItem"
import styles from './Employees.module.scss'
import { useNavigate } from "react-router-dom"
import { IEmployee } from "../../types/types"
import Modal from "../../modal-view/Modal"
import AddEmployee from "../../employee-card/AddEmployee"

const Employees = () => {
    const [selectEmployee, setSelectEmployee] = useState('all')
    const [isArchive, setIsArchive] = useState<boolean>()
    const [openModal, setOpenModal] = useState(false)

    const navigate = useNavigate()

    const { data } = useEmployeeApi()

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectEmployee(e.target.value)
    }

    const handleCheckedInput = (e: ChangeEvent<HTMLInputElement>) => {
        setIsArchive(e.target.checked)
    }

    const filterRole = selectEmployee === 'all' 
    ? data
    : data?.filter(item => item.role === selectEmployee) 

    const filterChek = isArchive === false 
    ? data?.filter(item => item.isArchive == false)
    : data?.filter(item => item.isArchive == true)

    const onEmployeeCardClick = (index: number, id: number | string) => () => {
        navigate(`employee/${id}`, { state: data?.[index] as IEmployee })
    }

    return (
        <div className={styles.main}>
            <header className={styles.header}>Employees pizza-soft</header>
            <div className={styles.item_list}>
            <div className={styles.filter}>
               <div className={styles.box_select}>
                  <select onChange={handleSelectChange}>
                    <option value='all'>Все профессии</option>
                    <option value='cook'>Повар</option>
                    <option value="waiter">Официант</option>
                    <option value='driver'>Водитель</option>
                  </select>
                  <button className={styles.archive_button} 
                  onClick={() => setOpenModal(true)} >Добавить сотрудника</button>
                </div>
                <div className={styles.check_box}>
                    <label className={styles.container}>В архиве
                        <input type="checkbox" checked={isArchive} onChange={handleCheckedInput}/>
                        <span className={styles.checkmark}></span>
                    </label>
                </div>
            </div>
            <Modal visible={openModal} setVisible={setOpenModal}>
                <AddEmployee />
            </Modal>
                {
                    isArchive ? (
                        filterChek?.map( (item, index) => (
                            <EmployeeItem key={item.id} 
                                          employee={item}
                                          onClick={onEmployeeCardClick(index, item.id)} />
                        ))
                    ) : (
                        filterRole?.map( (item, index) => (
                            <EmployeeItem key={item.id}
                                          employee={item}
                                          onClick={onEmployeeCardClick(index, item.id)}  />
                        ))
                    )
                }
            </div>
        </div>
    )
}
export default Employees