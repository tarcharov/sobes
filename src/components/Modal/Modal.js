import './Modal.css';
import {useState} from "react";

function Modal({item,setModalArr}) {
    const [active,setActive] = useState(true);
    const onClose = (item) => {
        setActive(false)
        setTimeout(() => {
            setModalArr(prev => prev.filter((el)=> el.id!==item.id))
        }, 1000)
        ;
    }
        return(
            <div className={active ? "modal" : "modal-close"}>
                <div className="modal-content">
                    <p>{item.text}</p>
                    <button className="button-delete" onClick={()=>onClose(item)}><span>Закрыть</span></button>
                </div>
            </div>
        );
}

export default Modal;
