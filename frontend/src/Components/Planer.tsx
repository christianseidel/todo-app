import './Planer.css'
import TodoItem, {Todo} from "./TodoItem";
import {useEffect, useState} from "react";



export default function Planer(props: Todo) {

    /* const [input, setInput] = useState(''); */

    /* const [charName, setCharName] = useState([] as Array<Character>); */


    /* const items = charName.filter(c => c.name.toLowerCase().includes(char.toLowerCase())).map(element => <GalleryItem name={element.name}
                                                                                                                      Species={element.species}
                                                                                                                      img={element.image}
                                                                                                                      origin={element.origin.name}
                                                                                                                      status={element.status}/>)
*/

    /*
                {list.map(() => <TodoItem task={}}
    */


    const [list, setList] = useState([] as Array<Todo>);


    useEffect(() => {
        fetch (`http://localhost:8080/todos`)
            .then(response => response.json())
            .then((responseBody: Array<Todo>) => {setList(responseBody)})

    }, []);

    let a : Array<number> = [12, 13, 14];

    return (
        <div>
            {/*list.map(todoList => <div>{todoList} </div>)*/}
            <div className={'head'}>
                <h1>To-Do-List</h1>
            </div>

            <div className={'list'}>
                <div>
                   Todo: {props.task}


                    {a}
                </div>

            </div>



        </div>
    )


}

