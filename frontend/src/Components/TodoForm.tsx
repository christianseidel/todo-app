import './TodoList.css'

import {Todo} from './model';
import {FormEvent, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";


interface TodoFormProps {
    onTodoCreation: (todos: Array<Todo>) => void;
}

// TodoForm allows adding new T0do Items
export default function TodoForm(props: TodoFormProps) {

    const {t} = useTranslation();

    const [task, setTask] = useState(localStorage.getItem('myTask') ?? '');
    const [description, setDescription] = useState(localStorage.getItem('myDescription') ?? '');

    const errorMessage: string = t('error-message') + '!';    //erscheint, wenn eine Aufgabe ohne Eingabe erstellt wird

    useEffect(() => {
        localStorage.setItem('myTask', task);
        localStorage.setItem('myDescription', description);
    }, [task, description]);

    function clearForm() {
        setTask('');
        setDescription('')
    }


    // erstellt ein neues TodoItem
    const addTask = () => {
        if (task === '' || task === errorMessage) {
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
        <div  className={'input-field-container'}>

            <div>
                <input className={'input-field-task'} type={"text"} placeholder={t("input-field-task")}
                       value={task} onChange={input => setTask(input.target.value)}/>
            </div>
            <div>
                <input className={'input-field-description'} type={"text"} placeholder={t("input-field-description")}
                       value={description} onChange={input => setDescription(input.target.value)}/>
            </div>
            <div>
                <button id={'create-button'} type="submit" onClick={addTask}>{t('button-new-task')}</button>
            </div>
            <div>
                <button onClick={clearForm}>{t("button-clear-all")}</button>
            </div>

        </div>
    )
}