import './TodoList.css'
import {Todo} from "./model";
import {useEffect, useState} from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import deFlag from '../img/de.png'
import enFlag from '../img/en.png'


export default function TodoList() {

    const [list, setList] = useState([] as Array<Todo>);
    const user = "Christian";       // in Vorbereitung auf eine später einzurichtende User-Abfrage - user erscheint in der Titelzeile
    const {t} = useTranslation();

    useEffect(() => {
        getAllTasks()
    }, []);

    const getAllTasks = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/todos`)
            .then(response => response.json())
            .then((responseBody: Array<Todo>) => {
                setList(responseBody)
            })
    }
    // const [language, setLanguage] = useState(localStorage.getItem('i18nextLng') ?? 'de');
    // let language: string;
    // const [languageIcon, setLanguageIcon] = useState(localStorage.getItem('langIcon') ?? );

    let language: string = localStorage.getItem('i18nextLng') ?? '';

    let languageIcon;

    function setLanguage() {
        if (localStorage.getItem('i18nextLng') === 'en') {
            i18n.changeLanguage('de');
            languageIcon = enFlag;
        } else {
            i18n.changeLanguage('en');
            languageIcon = deFlag;
        }
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