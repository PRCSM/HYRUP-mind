import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Jobs from './pages/Jobs'
import Explore from './pages/Explore'
import Settings from './pages/Settings'
import Chat from './pages/Chat'
import Navbar from './components/common/Navbar'

function App() {
  return (
    <div className='w-screen h-screen overflow-hidden flex items-center pl-4 gap-4'>
      <Navbar />
      <div className='flex-1 h-full'>
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
