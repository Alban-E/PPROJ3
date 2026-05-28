import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar.jsx'
import Home from './pages/home.jsx'
import Details from './pages/details.jsx'
import Publisher from './pages/publisher.jsx'
import Lists from './pages/lists/Lists.jsx'
import ListDetails from './pages/lists/ListDetails.jsx'
import Feed from './pages/feed.jsx'
import Temp from './pages/Temp.jsx'
import NotFound from './pages/notFound.jsx'
import Account from './pages/account.jsx'

import './App.css'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Feed' element={<Feed />} />
        <Route path='/List' element={<Lists />} />
        <Route path='/List/details' element={<ListDetails />} />
        <Route path='/Details' element={<Details />} />
        <Route path='/Publisher' element={<Publisher />} />
        <Route path='/Account' element={<Account />} />
        <Route path='/auth-success' element={<Account />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}