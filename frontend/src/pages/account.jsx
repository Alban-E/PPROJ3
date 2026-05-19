import { useState } from "react"
import { checkConnexion } from "../service/axios"
import { useAuth } from "../service/AuthContext"
import Login from "../components/account/login"
import Register from "../components/account/register"
import Profile from "../components/account/profile"
import { useEffect } from "react"

export default function Account() {
    const {user, loading} = useAuth()
    const [state, setState] = useState('register')

    if (loading) {
        return(
            <>
                <h3>Chargement ...</h3>
            </>
        )
    }

    if (user) { 
        return <Profile/>
    }

    const buttonText = state === "register" ? "Se connecter" : "Créer un compte"

    return(
        <>
            <button onClick={() => {setState(state === "register" ? "login" : "register")}}>{buttonText}</button>
            {state === "register" && <Register/>}
            {state === "login" && <Login/>}
        </>
    )
}