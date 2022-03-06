import './TodoList.css'
import {Todo} from "./model";
import {useEffect, useState} from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

import {renderIntoDocument} from "react-dom/test-utils";
import {useTranslation} from "react-i18next";
import {t} from "i18next";

export function Imprint () {
    const {t} = useTranslation();
}

export default function TodoList() {

    const [list, setList] = useState([] as Array<Todo>);
    const user = "Christian";       // in Vorbereitung auf eine später einzurichtende User-Abfrage - user erscheint in der Titelzeile


    // useEffect generiert den Standard, wie ich ihn beim Öffnen der Seite vorfinde.
    useEffect(() => {
        getAllTasks ()
    }, []);

    const getAllTasks = () => {
        fetch (`${process.env.REACT_APP_BASE_URL}/todos`)
            .then(response => response.json())
            .then((responseBody: Array<Todo>) => {setList(responseBody)})
    }





    return (
        <div>
            <div className={'head-line'}>
                <span id={'head-line-center-piece'}><h1> {user}{t('title')}</h1></span>

                <span id={'head-line-right-side'}><img src={'globe.jpg'} alt={'planet a'} /></span>
            </div>

            <div className={'container'}>
                <div className={'child-container-left'}>    {/* hier steht die Titelzeile der Ausgabe*/}
                    <h2 className={'child-container-title'}>Meine To-Dos</h2>
                    <div className={'child-container-body'}>
                    {list.map(item => <TodoItem key={item.id} todo={item} onTodoChange={setList} onTodoDeletion={getAllTasks}/>)}  {/* Das T0D0 an dieser Stelle ist ein Array aus T0D0-items */}
                    </div>
                </div>

                <div className={'child-container-right'}>
                    <TodoForm onTodoCreation={setList}/>
                </div>
            </div>
        </div>
    )
}

