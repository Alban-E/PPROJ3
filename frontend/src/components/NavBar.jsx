import { NavLink } from 'react-router-dom'
import styles from './navBar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar} >
      <NavLink to="/"
      className={({ isActive }) => isActive ? `${styles.navBarLink} ${styles.active}` : styles.navBarLink } >Accueil </NavLink>
      
      <NavLink to="/Feed"
      className={({ isActive }) => isActive ? `${styles.navBarLink} ${styles.active}` : styles.navBarLink } >Feed </NavLink>
      
      <NavLink to="/List"
      className={({ isActive }) => isActive ? `${styles.navBarLink} ${styles.active}` : styles.navBarLink } >Playlists </NavLink>      

      <NavLink to="/Account"
      className={({ isActive }) => isActive ? `${styles.navBarLink} ${styles.active}` : styles.navBarLink } >Account </NavLink>
    </nav>
  )
}
        