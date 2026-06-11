import { useState } from "react"
import { useAuth } from "../../../service/AuthContext";
import styles from "./authPart.module.css"

export default function Login () {
    const [loginValue, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [result, setResult] = useState('')

    const { login } = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await login({ login: loginValue, password })
            setResult("Vous êtes connecté")
        } catch (err) {
            const status = err.response?.status 
            if (!status) { setResult(err.message) }
            else if (status === 404) { setResult("Aucun utilisateur ne correspond à ce login/password") }
            else if (status === 500) { setResult("Une erreur est survenue") }
        }

        setLogin('')
        setPassword('')
    }


    return (
        <>
            <form className={styles.form} onSubmit={handleLogin}>
            {result && <p>{result}</p>}
                <div className={styles.inputContainer}>
                    <p className={styles.inputField}>Login</p>
                    <input placeholder="login" value={loginValue} onChange={newLogin => setLogin(newLogin.target.value)} className={styles.input} required />
                </div>
                <div className={styles.inputContainer}>
                    <p className={styles.inputField}>Mot de passe</p>
                    <input placeholder="Mot de passe" type="password" value={password} onChange={newPassword => setPassword(newPassword.target.value)} className={styles.input} required />
                </div>
                <input type="submit" content="Register" className={styles.submit}/>
            </form>
        </>
    )
} 