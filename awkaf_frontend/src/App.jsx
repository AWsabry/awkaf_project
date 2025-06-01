import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Projects from './pages/Projects/projects';
import AddProject from './pages/Projects/add_projects';
import Mosques from "./pages/Mosques/mosques";  
import AddMosque from "./pages/Mosques/add_mosques";
import BlockedProjects from "./pages/BlockedProjects/blocked_projects";
import AddBlockedProject from "./pages/BlockedProjects/add_blocked_project";
import Users from "./pages/Users/users";
import AddUser from "./pages/Users/add_user";
import Constructors from './pages/Constructors/constructors';
import AddConstructor from './pages/Constructors/add_constructor';
import Home from './pages/home/home';
import ProtectedRoute from './components/ProtectedRoute';
import ProjectNavBar from "./components/projectNavBar";
import PageTransition from './components/PageTransition';
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "./styles/custom.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes with navbar and page transitions */}
        <Route path="/*" element={
          <ProtectedRoute>
            <ProjectNavBar />
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="projects" element={<Projects />} />
                <Route path="add-project" element={<AddProject />} />
                <Route path="mosques" element={<Mosques />} />
                <Route path="add-mosque" element={<AddMosque />} />
                <Route path="blocked-projects" element={<BlockedProjects />} />
                <Route path="add-blocked-project" element={<AddBlockedProject />} />
                <Route path="users" element={<Users />} />
                <Route path="add-user" element={<AddUser />} />
                <Route path="constructors" element={<Constructors />} />
                <Route path="add-constructor" element={<AddConstructor />} />
              </Routes>
            </PageTransition>
          </ProtectedRoute>
        } />

        {/* Redirect root to home if logged in, otherwise to login */}
        {/* This redirect is now handled within ProtectedRoute */}
        {/* <Route path="/" element={<Navigate to="/projects" replace />} /> */}

      </Routes>
    </Router>
  );
}

export default App;
