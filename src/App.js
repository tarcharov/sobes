import './App.css';

import {useEffect, useState} from "react";

const URL = 'http://193.168.3.33:3000/food';

function App() {
    const [data,setData] = useState([]);
    const [inputId,setInputId] = useState("")
    const [inputTitle,setInputTitle] = useState("")
    const [inputDescription,setInputDescription] = useState("")
    useEffect(() => {
        fetch(URL,{
            method: "GET",
            headers:{
               "Content-type":"application/json",
         }
        }).then((result) => result.json()).then(res => setData(res));
    }, []);

    const onclickAdd = () => {
        fetch(URL,{
            method: "POST",
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify({title:inputTitle,description:inputDescription})
        }).then((result) => result.json()).then(res => setData(prev => [...prev,res]));
    }

    const onclickDelete = (itemId) => {
        fetch(URL+`/${itemId}`,{
            method: "DELETE",
            headers:{
                "Content-type":"application/json",
            },
        }).then(() => setData(prev => prev.filter((item)=>item.id.toString()!==itemId.toString())));
    }

    const onclickChange = () => {
        fetch(URL+`/${inputId}`,{
            method: "PATCH",
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify({title:inputTitle,description:inputDescription})
        }).then((result) => result.json()).then((res) => setData(data.map((item)=>{
            return item.id.toString() === inputId.toString() ? res : item
        })));
    }
  return (
    <div className="App">
        <input type="text" placeholder="id" size={3} value={inputId} onChange={e=> setInputId(e.target.value)}/>
        <input type="text" placeholder="title" size={20} value={inputTitle} onChange={e=> setInputTitle(e.target.value)}/>
        <input type="text" placeholder="description" size={20} value={inputDescription} onChange={e=> setInputDescription(e.target.value)}/>
        <button className="button-add" onClick={onclickAdd}>ADD</button>

        <button className="button-add" onClick={onclickChange}>CHANGE</button>
        {data.length > 0 ? (data.map((item)=>(<div className="items" key={item.id}>
                <div className="item">{item.id}</div>
                <div className="item" contentEditable>{item.title}</div>
                <div className="item" contentEditable>{item.description}</div>
                <button className="" onClick={()=>onclickDelete(item.id)}>DELETE</button>
            </div>
            )
        )) : null}
    </div>
  );
}

export default App;
