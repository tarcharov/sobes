import './Modal.css';

function Modal({item,setModalArr}) {

    const onClose = (item) => {
        setModalArr(prev => prev.filter((el)=>{
            console.log(el,item)
            return el.id!==item.id
        }))
    }
        return(
            <div className="modal">
                <div className="modal-content">
                    <p>{item.text}</p>
                    <button onClick={()=>onClose(item)}>Закрытьб</button>
                </div>
            </div>
        );
}

export default Modal;
