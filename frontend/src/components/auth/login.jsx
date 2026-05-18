import { useState } from "react"
import { login } from "../../service/axios";
import styles from "./login.module.css"
import { NavLink } from "react-router-dom";

export default function Login () {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const data = await login({ login, password })
            console.log(data)
        } catch (err) {
            console.error(err.response?.data || err.message)
        }
    }


    return (
        <>
            <NavLink to="/Register">Créer un compte</NavLink>
            <form className={styles.form} onSubmit={handleLogin}>
                <div>
                    <p>login</p>
                    <input placeholder="login" value={login} onChange={newLogin => setLogin(newLogin.target.value)} required />
                </div>
                <div>
                    <p>password</p>
                    <input placeholder="password" type="password" value={password} onChange={newPassword => setPassword(newPassword.target.value)} required />
                </div>
                <input type="submit" content="Register" />
            </form>
        </>
    )
} 