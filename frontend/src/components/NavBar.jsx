import { NavLink } from 'react-router-dom'
import './navBar.css'

export default function Navbar() {
  return (
    <nav className='navbar' style={{flex:1}}>
      <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Accueil </NavLink>
      <NavLink to="/Details" className={({ isActive }) => isActive ? 'active' : ''}>Details </NavLink>
      <NavLink to="/Lists" className={({ isActive }) => isActive ? 'active' : ''}>Lists </NavLink>
      <NavLink to="/Feed" className={({ isActive }) => isActive ? 'active' : ''}>Feed </NavLink>
      <NavLink to="/Profile" className={({ isActive }) => isActive ? 'active' : ''}>Profil </NavLink>
      <NavLink to="/Temp" className={({ isActive }) => isActive ? 'active' : ''}>Temp </NavLink>
    </nav>
  )
}
