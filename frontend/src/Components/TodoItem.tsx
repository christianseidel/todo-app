
export interface Todo {
    id?: string;
    task: string;
    description?: string;
    status: string;
}

function TodoItem(props: Todo) {

    let a = 12;

    return(
        <div className={'item'}>

            {a}
            {/*{props.status}*/}

            Aufgabe: {props.task}   {/* wird nicht angezeigt...*/};

        </div>
    )
}

export default TodoItem;