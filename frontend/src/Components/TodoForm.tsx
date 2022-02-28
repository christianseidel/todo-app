import './TodoList.css'
import {Todo} from './model';
import {useState} from "react";

interface TodoFormProps {
    onTodoCreation: (todos: Array<Todo>) => void;
}

export default function TodoForm(props: TodoFormProps) {

    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const errorMessage : string = '¡noch keine Aufgabe erstellt!';      //erscheint, wenn eine Aufgabe ohne Eingabe erstellt wird

    // erstellt ein neues TodoItem
    const addTask = () => {
        if (task == '' || task == errorMessage) {
            setTask(errorMessage);
            setDescription(' ');
        } else {
            fetch('http://localhost:8080/todos', {
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