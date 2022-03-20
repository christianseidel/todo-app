import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";


function Login() {

    const {t} = useTranslation();

    const [name, setName] = useState(localStorage.getItem('userName') ?? '');
    const [password, setPassword] = useState(localStorage.getItem('userPassword') ?? '');
    const [errMsg, setErrMsg] = useState('')


    useEffect(() => {
        localStorage.setItem('userName', name);
    }, [name]);

    function loginUser(user: string, password: string) {
        console.log("Anwender " + user + " hat das Passwort: " + password);
        fetch(`${process.env.REACT_APP_BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: user,
                password: password
            })
        })
            .then (response => {
                if (!response.ok) {
                    localStorage.setItem("user", "");
                    localStorage.setItem("token", "");
                    setErrMsg(t("msg-wrong-credentials"));
                    throw new Error()
                }
                setErrMsg("");
                return response.text();
            })
            .then((responseBody: string) => localStorage.setItem("token", responseBody))
            .then(() => localStorage.setItem("user", user));

        console.log("user = " + user);    // wieso gibt die Konsole das nicht aus?
        setName('');
        setPassword('');
    }

    return (
        <div>
            <form>
                <div>
                    <input type={"text"} placeholder={t("login-field-user")}
                           value={name} onChange={input => setName(input.target.value)}/>
                </div>
                <div>
                    <input type={"password"} placeholder={t("login-field-password")} value={password}
                           onChange={input => setPassword(input.target.value)}/>
                </div>
            </form>

            <div>
                <button type={"submit"} onClick={() => loginUser(name, password)}>{t("button-login")}</button>
            </div>

            <p>
                <b>{errMsg}</b>
            </p>
        </div>

    )

}

export default Login
