import './Planer.css'
import {Todo} from "./model";
import {useEffect, useState} from "react";


export default function Planer() {

    const [list, setList] = useState([] as Array<Todo>);
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const errorMessage : string = '¡noch keine Aufgabe erstellt!';      //erscheint, wenn eine Aufgabe ohne Eingabe erstellt wird

    const user = "Christian";       // in Vorbereitung auf eine später einzurichtende User-Abfrage - user erscheint in der Titelzeile

    // useEffect generiert den Standard, wie ich ihn beim Öffnen der Seite vorfinde.
    useEffect(() => {
        getAllTasks ()
    }, []);

    const getAllTasks = () => {
        fetch (`http://localhost:8080/todos`)
            .then(response => response.json())
            .then((responseBody: Array<Todo>) => {setList(responseBody)})
    }


    // erstellt ein neues TodoItem
    const addTask = () => {
        if (task == '' || task == errorMessage) {
            setTask(errorMessage);
        } else {
            fetch('http://localhost:8080/todos', {
                method: "POST",
                body: JSON.stringify({task: task, description: description}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(() => getAllTasks())
                .then(() => {
                    setTask('')
                    setDescription('')
                })
        }
    }

    return (
        <div>
            <div className={'head-line'}>
                <h1> {user}'s To-Do-List</h1>
            </div>

            <div className={'container'}>
                <div className={'container-child-left'}>
                    <div>
                        <h2>Deine Aufgaben</h2>
                        {list.map((item) =>
                            <div className={'task'}>{item.task} &nbsp; {item.description}</div>)}


                    </div>

                </div>
                <div className={'container-child-right'}>
                    <div className={'input-field-container'}>
                        <input  className={'input-field-task'} type={"text"} placeholder={"deine neue Aufgabe..."} value={task} onChange={input => setTask(input.target.value) }/>
                    </div>
                    <div>
                        <input  className={'input-field-description'} type={"text"} placeholder={"...und ihre Beschreibung"} value={description} onChange={input => setDescription(input.target.value) }/>
                    </div>
                    <div>
                        <button id={'create-button'} type="submit" onClick={addTask}>Aufgabe anlegen</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

