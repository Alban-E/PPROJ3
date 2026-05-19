import { NavLink } from "react-router-dom";
import styles from "./notFound.module.css"

export default function NotFound() {
  return (
    <div className={styles.main}>
      <h1>404 - Page introuvable</h1>
      <NavLink to="/">Retour à l'accueil</NavLink>
    </div>
  )
}