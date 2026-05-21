import { useState } from "react"
import { register } from "../../../service/axios";
import styles from "./register.module.css"

export default function Register() {
    const [username, setUsername] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [result, setResult] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault()
        setResult("")

        try {
            const res = await register({ username, login, password })
            console.log(res.data)
            setResult("Compte créé avec succès ")

        } catch (err) {
            const status = err.response?.status
            if (!status) { setResult(err.message) }
            else if (status === 400) { setResult("Données invalides") }
            else if (status === 409) { setResult("Un utilisateur avec ce login existe déjà") }
            else if (status === 500) { setResult("Une erreur est survenue") }
        }

        setUsername('')
        setLogin('')
        setPassword('')
    }

    return (
        <>
            <form className={styles.form} onSubmit={handleRegister}>
                {result && <p>{result}</p>}
                <div>
                    <p>username</p>
                    <input placeholder='username' value={username} onChange={newUsername => setUsername(newUsername.target.value)} required />
                </div>
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