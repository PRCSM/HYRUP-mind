import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import VerifySkill from "./pages/VerifySkill";
import Jobs from "./pages/Jobs";
import Explore from "./pages/Explore";
import Settings from "./pages/Settings";
import Chat from "./pages/Chat";
import Navbar from "./components/common/Navbar";
import Search from "./components/common/Search";
import SavedJobs from "./pages/SavedJobs";
import SignUp from "./pages/SignUp";
import Registration from "./pages/Registration";
import RegistrationSuccess from "./pages/RegistrationSuccess";

function App() {
  const location = useLocation();
  const isSignUpPage =
    location.pathname === "/signup" ||
    location.pathname === "/registration" ||
    location.pathname === "/registration-success";

  return (
    <div className="w-screen h-screen overflow-hidden flex items-center gap-4 relative">
      {!isSignUpPage && <Navbar />}
      <div className="flex-1 h-full relative">
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-edit" element={<ProfileEdit />} />
          <Route path="/verify-skill" element={<VerifySkill />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/registration-success"
            element={<RegistrationSuccess />}
          />
        </Routes>
      </div>
      {!isSignUpPage && <Search />}
    </div>
  );
}

export default App;
