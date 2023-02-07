import './App.css';
import {useEffect, useState} from "react";
import Modal from "./components/Modal/Modal";

const URL = 'http://193.168.3.33:3000/food';

function App() {
    const [data,setData] = useState([]);
    const [inputTitle,setInputTitle] = useState("")
    const [inputDescription,setInputDescription] = useState("")
    const [modalActive,setModalActive] = useState(false)
    // const [modalText,setModalText] = useState("")
    const [modalArr,setModalArr] = useState([])
    useEffect(() => {
        fetch(URL,{
            method: "GET",
            headers:{
               "Content-type":"application/json",
         }
        }).then((result) => result.json()).then(res => setData(res.sort((a, b) => a.id > b.id ? 1 : -1)));
    }, []);

    const onclickAdd = () => {
        fetch(URL,{
            method: "POST",
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify({title:inputTitle,description:inputDescription})
        }).then((result) => result.json()).then(res => setData(prev => [...prev,res]));
        openModal("ADD")
    }

    const onclickDelete = (itemId) => {
        fetch(URL+`/${itemId}`,{
            method: "DELETE",
            headers:{
                "Content-type":"application/json",
            },
        }).then(() => setData(prev => prev.filter((item)=>item.id.toString()!==itemId.toString())));
        openModal("DELETE")
    }

    const onChangeClick = (id,title,description) => {
        fetch(URL+`/${id}`,{
            method: "PATCH",
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify({title:title,description:description})
        }).then((result) => result.json()).then((res) => setData(data.map((item)=>{
            return item.id.toString() === id.toString() ? res : item
        })));
        openModal("ONCHANGE")
    }

    const openModal = (text) =>{
        setModalActive(true)
        setModalArr(prev => [...prev,{id:prev.length,text:text}])
    }
  return (
    <div className="App">
        <div className={modalActive ? "modals-wrapper active" : "modals-wrapper"}>
            {modalArr.length > 0 ? (modalArr.map((item)=>(
                <Modal key={item.id} setActive={setModalActive} setModalArr={setModalArr} item={item}/>
            ))):null}
        </div>
        <div className="header">
            <input type="text" placeholder="title" size={20} value={inputTitle} onChange={e=> setInputTitle(e.target.value)}/>
            <input type="text" placeholder="description" size={20} value={inputDescription} onChange={e=> setInputDescription(e.target.value)}/>
            <button className="button-add" onClick={onclickAdd}>ADD</button>
        </div>
        {data.length > 0 ? (data.map((item)=>(
                <div className="items-wrapper">
                    <div className="items" key={item.id}>
                        <div className="item-id">{item.id}</div>
                        <div className="item" contentEditable suppressContentEditableWarning={true} onBlur={e => onChangeClick(item.id, e.currentTarget.textContent, item.description)}>{item.title}</div>
                        <div className="item" contentEditable suppressContentEditableWarning={true} onBlur={e => onChangeClick(item.id, item.title,e.currentTarget.textContent)}>{item.description}</div>
                        <svg className="delete_icon" onClick={()=>onclickDelete(item.id)}>
                            <path className="st1" d="M17,5l-3-3h-4L7,5H17z"/>
                            <line className="st0" x1="4" y1="4" x2="20" y2="4"/>
                            <line className="st0" x1="14" y1="18" x2="14" y2="7"/>
                            <line className="st0" x1="10" y1="18" x2="10" y2="7"/>
                            <path className="st0" d="M6,4v16c0,0.6,0.4,1,1,1h10c0.6,0,1-0.4,1-1V4"/>
                        </svg>
                    </div>
                </div>
            )
        )) : null}
    </div>
  );
}

export default App;
