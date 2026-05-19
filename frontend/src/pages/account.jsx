import { useState } from "react"
import Login from "../components/auth/login"
import Register from "../components/auth/register"

export default function Account() {
    const [connected, setConnected] = useState(false)
    const [state, setState] = useState('register')

    const changeState = () => {
        switch (state) {
            case "register":
                setState("login")
                break
            case "login":
                setState("register")
                break
            default:
                console.log("Another state than register or login should not exist")
                break
        }
    }

    const buttonText = state === "register" ? "Se connecter" : "Créer un compte"

    return(
        <>
            <button onClick={changeState}>{buttonText}</button>
            {state === "register" && <Register/>}
            {state === "login" && <Login/>}
        </>
    )
}