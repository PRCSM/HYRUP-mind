import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import Explore from "./pages/Explore";
import Settings from "./pages/Settings";
import Chat from "./pages/Chat";
import Navbar from "./components/common/Navbar";
import Search from "./components/common/Search";
import SavedJobs from "./pages/SavedJobs";

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden flex items-center gap-4 relative">
      <Navbar />
      <div className="flex-1 h-full relative">
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
        </Routes>
      </div>
      <Search />
    </div>
  );
}

export default App;
