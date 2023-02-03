import './App.css';

import {useEffect, useState} from "react";

const URL = 'http://193.168.3.33:3000/food';

function App() {
    const [data,setData] = useState([]);
    const [inputTitle,setInputTitle] = useState("")
    const [inputDescription,setInputDescription] = useState("")
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
    }

    const onclickDelete = (itemId) => {
        fetch(URL+`/${itemId}`,{
            method: "DELETE",
            headers:{
                "Content-type":"application/json",
            },
        }).then(() => setData(prev => prev.filter((item)=>item.id.toString()!==itemId.toString())));
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
        console.log(data)
    }
  return (
    <div className="App">
        <div>
            <input type="text" placeholder="title" size={20} value={inputTitle} onChange={e=> setInputTitle(e.target.value)}/>
            <input type="text" placeholder="description" size={20} value={inputDescription} onChange={e=> setInputDescription(e.target.value)}/>
            <button className="button-add" onClick={onclickAdd}>ADD</button>
        </div>
        {data.length > 0 ? (data.map((item)=>(
            <div>
                <div className="items" key={item.id}>
                    <div className="item">{item.id}</div>
                    <div className="item" contentEditable onBlur={e => onChangeClick(item.id, e.currentTarget.textContent, item.description)}>{item.title}</div>
                    <div className="item" contentEditable onBlur={e => onChangeClick(item.id, item.title,e.currentTarget.textContent)}>{item.description}</div>
                    <button className="" onClick={()=>onclickDelete(item.id)}>DELETE</button>
                </div>
            </div>
            )
        )) : null}
    </div>
  );
}

export default App;
