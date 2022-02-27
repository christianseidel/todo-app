import './Planer.css'
import TodoItem, {Todo} from "./TodoItem";
import {useEffect, useState} from "react";



export default function Planer() {

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
    const user = "Christian";       // in Vorbereitung auf eine später einzurichtende User-Abfrage


    useEffect(() => {
        fetch (`http://localhost:8080/todos`)
            .then(response => response.json())
            .then((responseBody: Array<Todo>) => {setList(responseBody)})

    }, []);


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
                            <div className={'task'}>{item.task} &nbsp; &nbsp; &nbsp; &nbsp; {item.status}</div>)}



                    </div>

                </div>
                <div className={'container-child-right'}>
                       <p>hier fehlt noch der Text...</p>
                </div>
            </div>


        </div>
    )


}

