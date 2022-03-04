import './TodoList.css'

import {Todo} from './model';
import {useEffect, useState} from "react";

interface TodoFormProps {
    onTodoCreation: (todos: Array<Todo>) => void;
}

// TodoForm serves to add a new T0do Item
export default function TodoForm(props: TodoFormProps) {

    // Safe new t0do in Local Storage:
    const STORAGE_KEY_1 = 'myTask';
    const STORAGE_KEY_2 = 'myDescription';

    const [task, setTask] = useState(localStorage.getItem(STORAGE_KEY_1) ?? '');
    const [description, setDescription] = useState(localStorage.getItem(STORAGE_KEY_2) ?? '');

    const errorMessage : string = '¡noch keine Aufgabe erstellt!';      //erscheint, wenn eine Aufgabe ohne Eingabe erstellt wird


    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_1, task);
    }, [task]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_2, description);
    }, [description]);


    // erstellt ein neues TodoItem
    const addTask = () => {
        if (task == '' || task == errorMessage) {
            setTask(errorMessage);
            setDescription(' ');
        } else {
            fetch(`${process.env.REACT_APP_BASE_URL}/todos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    task: task,
                    description: description
                })
            })
            .then(response => response.json())
            .then((todosFromBackend: Array<Todo>) => props.onTodoCreation(todosFromBackend));
            setTask('');
            setDescription('');
        }
    }



    return (
        <div>
            <div className={'input-field-container'}>
                <input  className={'input-field-task'} type={"text"} placeholder={"Deine neue Aufgabe..."} value={task} onChange={input => setTask(input.target.value) }/>
            </div>

            <div>
                <input  className={'input-field-description'} type={"text"} placeholder={"...und ihre Beschreibung"} value={description} onChange={input => setDescription(input.target.value) }/>
            </div>

            <div>
                <button id={'create-button'} type="submit" onClick={addTask}>Aufgabe anlegen</button>
            </div>
        </div>
    )
}