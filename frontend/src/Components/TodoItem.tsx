import './TodoItem.css';

import {Status, Todo} from "./model";
import {useEffect, useState} from "react";

interface TodoItemProps {
    todo: Todo
    onTodoDeletion: () => void;
    onTodoChange: (list: Array<Todo>) => void;
}

function TodoItem(props: TodoItemProps) {

    function deleteTask() {
        fetch(`${process.env.REACT_APP_BASE_URL}/todos/${props.todo.id}`, {
            method: 'DELETE'
        })
        .then(() => props.onTodoDeletion ());
    }

    function changeState() {
        const newStatus = props.todo.status === Status.Open ? Status.Done : Status.Open;
        fetch(`${process.env.REACT_APP_BASE_URL}/todos/${props.todo.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: props.todo.id,
                task: props.todo.task,
                description: props.todo.description,
                status: newStatus
            })
        })
            .then(() => {})
            .then(() => console.log('soweit okay'));
    }

    return (
        <div>
            <div className={'item'}>

                <div className={'child'}>{props.todo.task}</div>
                <div className={'child'}> &ndash; {props.todo.description} &ndash; </div>
                <div className={'child'}><div onClick={() => changeState()}> Status: {props.todo.status}</div></div>
                <div className={'child'}><button id={'delete-button'} type="submit" onClick={deleteTask}>&#10006;</button></div>
            </div>
        </div>
    )
}

export default TodoItem;