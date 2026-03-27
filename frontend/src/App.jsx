import './App.css'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/NavBar'

import Home from './pages/Home'
import Profile from './pages/Profile'
import Details from './pages/Details'
import Feed from './pages/Feed'
import Lists from './pages/Lists'
import Temp from './pages/Temp'
import NotFound from './pages/NotFound'

export default function App(){
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Details' element={<Details/>} />
        <Route path='/Feed' element={<Feed/>} />
        <Route path='/Lists' element={<Lists/>} />
        <Route path='/Profile' element={<Profile/>} />
        <Route path='/Temp' element={<Temp/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </>
  );
}

