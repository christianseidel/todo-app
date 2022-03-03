import {Todo} from "./model";
import './TodoItem.css';

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

    return (
        <div>
            <div className={'item'}>
                <div className={'child'}>{props.todo.task}</div>
                <div className={'child'}> &ndash; </div>
                <div className={'child'}>{props.todo.description}</div>
                <div className={'child'}> &ndash; </div>
                <div className={'child'}>{props.todo.status}</div>
                <div className={'child'}><button id={'delete-button'} type="submit" onClick={deleteTask}>&#10006;</button></div>
            </div>

        </div>
    )
}

export default TodoItem;