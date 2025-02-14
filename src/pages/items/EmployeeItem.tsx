import { DetailedHTMLProps, FC, HTMLAttributes, MouseEventHandler } from 'react'
import styles from './EmployeeItem.module.scss'
import { useAppSelector } from '../../store/store'
import { selectors } from '../../store/selectors'
import { useActions } from '../../hooks/useActions'
import { IEmployee } from '../../types/types'

interface EmployeeItemProps 
extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    employee: IEmployee 
}

const EmployeeItem: FC<EmployeeItemProps> = ({employee, ...props}) => {

    const setSalary = useAppSelector(selectors.getEmployee)
    const { setEmployee } = useActions()
    const isExist = setSalary.some(item => item.id === employee.id)

    const handleFavorite: MouseEventHandler<HTMLButtonElement>  = (e) => {
        setEmployee(employee)
        e.stopPropagation()
    }
    return (
        <div className={styles.item} {...props}>
            <div className={styles.info}>
                <div className={styles.name}>
                    Имя: {employee.name}
                </div>
                <div className={styles.description}>
                    Должность: <i>{employee.role}</i>
                </div>
            </div>
            <div className={styles.numberInfo}>
                <button className={styles.favorite_button} 
                        onClick={handleFavorite}>
                    { isExist ? 'Отменить' : 'Повысить' }
                </button>
                <div className={styles.number}>
                    Тел: {employee.phone}
                </div>
            </div>
        </div>
    )
}
export default EmployeeItem