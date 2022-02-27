
export interface Todo {
    id?: string;
    task: string;
    description?: string;
    status: string;
}

function TodoItem(props: Todo) {

    return(
        <div className={'item'}>

        </div>
    )
}

export default TodoItem;