import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar.jsx'
import Home from './pages/home.jsx'
import Details from './pages/details.jsx'
import Lists from './pages/lists.jsx'
import Feed from './pages/feed.jsx'
import Profile from './pages/profile.jsx'
import Temp from './pages/Temp.jsx'
import NotFound from './pages/notFound.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Details' element={<Details />} />
        <Route path='/Lists' element={<Lists />} />
        <Route path='/Feed' element={<Feed />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/Temp' element={<Temp />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
