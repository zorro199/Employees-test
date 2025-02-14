import { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import style from './Modal.module.scss'

interface ModalProps {
    visible: boolean
    setVisible: Dispatch<SetStateAction<boolean>>
    children: ReactNode
}

const Modal: FC<ModalProps> = ({visible, setVisible, children}) => {
    const rootClass = [style.modal]
    if (visible) {
        rootClass.push(style.active)
    }
    return (
        <div className={rootClass.join(' ')} onClick={() => setVisible(false)}>
            <div className={style.modalContent} 
                 onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
export default Modal