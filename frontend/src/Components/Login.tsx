import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";


function Login() {

    const {t} = useTranslation();

    const [user, setUser] = useState(localStorage.getItem('userName') ?? '');
    const [password, setPassword] = useState(localStorage.getItem('userPassword') ?? '');

    useEffect(() => {
        localStorage.setItem('userName', user);
    }, [user]);


    ///
    ///

    function loginUser(user : string, password : string) {
        console.log("Anwender " + user + " hat das Passwort: " + password);
        fetch(`${process.env.REACT_APP_BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: user,
                password: password
            })
        })
            .then(response => response.json())
            .then((userFromBackend: string) => setUser(userFromBackend));
                console.log("user = " + user)
        setUser('');
    }
    ///
    ///


    return (
        <div>
            <form>
                <div>
                    <input  type={"text"} placeholder={t("login-field-user")}
                            value={user} onChange={input => setUser(input.target.value)}/>
                </div>
                <div>
                    <input  type={"password"} placeholder={t("login-field-password")} value={password}
                            onChange={input => setPassword(input.target.value)}/>
                </div>

                <div>
                    <button type={"submit"} onClick={() => loginUser("franz", "franz")}>{t("button-login")}</button>
                </div>

                <div>

                </div>
            </form>
            <div>
                <button onClick={() => loginUser("susanne", "susanne")}>los!</button>
                </div>
        </div>

    )

}

export default Login
