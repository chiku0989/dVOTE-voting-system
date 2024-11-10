import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
//react router dom
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

//footer
import Footer from "./components/Footer/Footer"
//protected routes
import ProtectedRoute from "./utils/ProtectedRoute";

//pages
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import VoterList from "./pages/VoterList/VoterList";
import CandidateList from "./pages/CandidateList/CandidateList";
import OwnerDashBoard from "./pages/OwnerDashBoard/OwnerDashBoard";
import ApproveCandidates from "./pages/ApproveCandidates/ApproveCandidates";
import { ApproveVoter } from "./pages/ApproveVoter/ApproveVoter";
import VoterDash from "./pages/VoterDash/VoterDash";
import CandidateDash from "./pages/CandidateDash/CandidateDash";
import RegisterPrompt from "./pages/RegisterPrompt/RegisterPrompt";
//bootstrap
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../node_modules/bootstrap/dist/js/bootstrap";
import Navbar from "./components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const isLoggedIn = window.localStorage.getItem("isLoggedIn")
  const userType = window.localStorage.getItem("userType")
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        {/* public routes */}
        <Route path="/voterlist" element={<VoterList />} />
        <Route path="/candidatelist" element={<CandidateList />} />
        { !isLoggedIn && (
          <>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/register-redirect" element={<RegisterPrompt />} />
          </>
        )}



        <Route element={<ProtectedRoute/>}>

          {userType === 'admin'? (
            <>
             {/* owner routes */}
             <Route path="/" element={<Navigate to='/ownerdash' />} />
          <Route path="/ownerdash" element={<OwnerDashBoard />} />
          <Route path="/approvecandidate" element={<ApproveCandidates />} />
          <Route path="/approvevoter" element={<ApproveVoter />} />

            </>
          ) : userType === 'candidate' ? (
            <>
             {/* candidate routes */}
             <Route path="/" element={<Navigate to='/candidatedash' />} />
             <Route path="/candidatedash" element={<CandidateDash />} />
            </>
          ) : (<>
           {/* voter routes */}
           <Route path="/" element={<Navigate to='/voterdash' />} />
           <Route path="/voterdash" element={<VoterDash />} />
          </>) }
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
