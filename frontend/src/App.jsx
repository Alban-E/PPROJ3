import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar.jsx'
import Home from './pages/home.jsx'
import Details from './pages/details.jsx'
import Playlists from './pages/Playlists/playlists.jsx'
import Feed from './pages/feed.jsx'
import Temp from './pages/Temp.jsx'
import NotFound from './pages/notFound.jsx'
import Account from './pages/account.jsx'

import './App.css'
import PlayListDetails from './pages/Playlists/playlistDetails.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Feed' element={<Feed />} />
        <Route path='/Playlist' element={<Playlists />} />
        <Route path='/Playlist/details' element={<PlayListDetails />} />
        <Route path='/Details' element={<Details />} />
        <Route path='/Account' element={<Account />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
