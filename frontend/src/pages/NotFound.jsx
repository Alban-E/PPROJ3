import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1>404 - Page introuvable</h1>
      <NavLink to="/">Retour à l'accueil</NavLink>
    </div>
  )
}