import './Modal.css';

function Modal({active,setActive,text}) {
        return(
            <div className={active ? "modal modal-active" : "modal"}>
                <div className="modal-content">
                    <p>{text}</p>
                    <button onClick={()=>setActive(false)}>Закрытьб</button>
                </div>
            </div>
        );
}

export default Modal;
