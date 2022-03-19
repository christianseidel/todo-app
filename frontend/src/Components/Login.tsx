import {findAllByDisplayValue} from "@testing-library/react";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {Status, Todo} from "./model";
import {log} from "util";


function Login() {

    const {t} = useTranslation();

    const [user, setUser] = useState(localStorage.getItem("userName") ?? '');
    const pwd : string ='';
    const [password, setPassword] = useState('')


    ///
    ///

    function loginUser(user : string, password : string) {
        console.log(user + " " + password);
        fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user, password
            })
        })
            .then(response => response.json())
            .then((todosFromBackend: Array<Todo>) => {
                // props.onTodoChange(todosFromBackend)
            });
    }
    ///
    ///


    return (
        <div>
            <form>
                <div>
                    <input  type={"text"} placeholder={t("login-field-user")} value={user} onChange={input => setUser(input.target.value)}/>
                </div>
                <div>
                    <input  type={"text"} placeholder={t("login-field-password")} value={password} onChange={input => setPassword(input.target.value)}/>
                </div>

                <div>
                    <button type={"submit"} onClick={() => loginUser("hans", "franz")}>{t("button-login")}</button>
                </div>

                <div>

                </div>
            </form>
        </div>

    )

}

export default Login
