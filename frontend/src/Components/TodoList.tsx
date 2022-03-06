import './TodoList.css'
import {Status, Todo} from "./model";
import {useEffect, useState} from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import {renderIntoDocument} from "react-dom/test-utils";
import {useTranslation} from "react-i18next";
import i18n from "i18next";


export default function TodoList() {

    const [list, setList] = useState([] as Array<Todo>);
    const user = "Christian";       // in Vorbereitung auf eine später einzurichtende User-Abfrage - user erscheint in der Titelzeile
    const {t} = useTranslation();


    // useEffect generiert den Standard, wie ich ihn beim Öffnen der Seite vorfinde.
    useEffect(() => {
        getAllTasks ()
    }, []);

    const getAllTasks = () => {
        fetch (`${process.env.REACT_APP_BASE_URL}/todos`)
            .then(response => response.json())
            .then((responseBody: Array<Todo>) => {setList(responseBody)})
    }

    let language:string = localStorage.getItem('i18nextLng') ?? '';
    let languageIcon:string = language + '.png';

    function setLanguage() {
        if (localStorage.getItem('i18nextLng') === 'en') {
            i18n.changeLanguage('de');
            languageIcon ='en.png'}                // Dieser Wert wird nicht an Zeile 46 übergeben, sondern die Funktion fällt zurück auf Zeile 29
        else {                                      // und ich weiß nicht wieso?!
            i18n.changeLanguage('en');
            language = 'de.png'};
        // eigentlich sollte ich die Eingabefelder an dieser Stelle ebenfalls auf '' setzen.
        return languageIcon;
    }

    return (
        <div>
            <div className={'head-line'}>
                <span id={'head-line-center-piece'}><h1> {user}{t('title')}</h1></span>
                <div id={'head-line-right-side'}><img src={languageIcon} width={'32px'} height={'32px'} alt={'set to English / Deutsch auswählen'} onClick={() => setLanguage()} /></div>
            </div>

            <div className={'container'}>
                <div className={'child-container-left'}>    {/* hier steht die Titelzeile der Ausgabe*/}
                    <h2 className={'child-container-title'}>{t('second-title')}</h2>
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

