import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Projects from './pages/Projects/projects';
import AddProject from './pages/Projects/add_projects';
import Mosques from "./pages/Mosques/mosques";  
import AddMosque from "./pages/Mosques/add_mosques";
import BlockedProjects from "./pages/BlockedProjects/blocked_projects";
import AddBlockedProject from "./pages/BlockedProjects/add_blocked_project";
import Users from "./pages/Users/users";
import AddUser from "./pages/Users/add_user";
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

        {/* Protected routes with navbar */}
        <Route path="/*" element={
          <ProtectedRoute>
            <ProjectNavBar />
            <PageTransition>
              <Routes>
                <Route path="projects" element={<Projects />} />
                <Route path="add-project" element={<AddProject />} />
                <Route path="mosques" element={<Mosques />} />
                <Route path="add-mosque" element={<AddMosque />} />
                <Route path="blocked-projects" element={<BlockedProjects />} />
                <Route path="add-blocked-project" element={<AddBlockedProject />} />
                <Route path="users" element={<Users />} />
                <Route path="add-user" element={<AddUser />} />
              </Routes>
            </PageTransition>
          </ProtectedRoute>
        } />

        {/* Redirect root to projects */}
        <Route path="/" element={<Navigate to="/projects" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
