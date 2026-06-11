import { useState } from "react"
import { register } from "../../../service/axios";
import styles from "./authPart.module.css"

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
                <div className={styles.inputContainer}>
                    <p className={styles.inputField}>Nom d'utilisateur</p>
                    <input placeholder='username' value={username} onChange={newUsername => setUsername(newUsername.target.value)} className={styles.input} required/>
                </div>
                <div className={styles.inputContainer}>
                    <p className={styles.inputField}>Login</p>
                    <input placeholder="login" value={login} onChange={newLogin => setLogin(newLogin.target.value)} className={styles.input} required />
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