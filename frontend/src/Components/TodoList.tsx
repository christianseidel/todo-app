import './TodoList.css'
import {Todo} from "./model";
import {useEffect, useState} from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import {renderIntoDocument} from "react-dom/test-utils";


export default function TodoList() {

    const [list, setList] = useState([] as Array<Todo>);
    const user = "Christian";       // in Vorbereitung auf eine später einzurichtende User-Abfrage - user erscheint in der Titelzeile
    const STORAGE_KEY = 'myNumber_Key';  // 3 Komponenten für Local Storage Feautre
    const [myNumber, setMyNumber] = useState(localStorage.getItem(STORAGE_KEY) ?? '1');
    const result : string = `${parseInt(myNumber) * parseInt(myNumber)}`;



    // useEffect generiert den Standard, wie ich ihn beim Öffnen der Seite vorfinde.
    useEffect(() => {
        getAllTasks ()
    }, []);

    const getAllTasks = () => {
        fetch (`${process.env.REACT_APP_BASE_URL}/todos`)
            .then(response => response.json())
            .then((responseBody: Array<Todo>) => {setList(responseBody)})
    }


    // useState und useEffect, um den Local Storage auszuprobieren
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, myNumber);
    }, [myNumber]);





    return (
        <div>
            <div className={'head-line'}>
                <h1> {user}'s To-Do-Liste</h1>
            </div>

            <div className={'container'}>

                <div className={'child-container-left'}>    {/* hier steht die Titelzeile der Ausgabe*/}

                    <h2> &nbsp; x<sup font-style={"line-height:2em"}>2</sup> </h2>

                    <input type="text" value={myNumber} onChange={ev => setMyNumber(ev.target.value)}/>
                    <p> {result} </p>


                    <h2>Deine To-Dos</h2>
                    {list.map(item => <TodoItem key={item.id} todo={item} onTodoChange={setList} onTodoDeletion={getAllTasks}/>)}  {/* das todo an dieser Stelle ist ein Array aus Todo-items */}
                </div>

                <div className={'child-container-right'}>     {/* hier steht die Titelzeile der Ausgabe*/}
                    <TodoForm onTodoCreation={setList}/>
                </div>

            </div>
        </div>
    )
}

