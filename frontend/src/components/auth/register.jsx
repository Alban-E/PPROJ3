import { useState } from "react"
import { register } from "../../service/axios";
import styles from "./register.module.css"

export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const data = await register({ username, email, login, password })
            console.log(data)
        } catch (err) {
            console.error(err.response?.data || err.message)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleRegister}>
            <div>
                <p>email: </p>
                <input placeholder="email@example.com" value={email} onChange={newEmail => setEmail(newEmail.target.value)} />
            </div>
            <div>
                <p>username</p>
                <input placeholder='username' value={username} onChange={newUsername => setUsername(newUsername.target.value)} />
            </div>
            <div>
                <p>login</p>
                <input placeholder="login" value={login} onChange={newLogin => setLogin(newLogin.target.value)} />
            </div>
            <div>
                <p>password</p>
                <input placeholder="password" value={password} onChange={newPassword => setPassword(newPassword.target.value)} />
            </div>
            <button>Register</button>
        </form>
    )
}