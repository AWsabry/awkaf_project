import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Projects from "./pages/Projects/projects";
import AddProject from "./pages/Projects/add_projects";
import Mosques from "./pages/Mosques/mosques";  
import AddMosque from "./pages/Mosques/add_mosques";
import BlockedProjects from "./pages/BlockedProjects/blocked_projects";
import AddBlockedProject from "./pages/BlockedProjects/add_blocked_project";
import ProjectNavBar from "./components/projectNavBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<>
          <ProjectNavBar />
          <Routes>
            <Route path="projects" element={<Projects />} />
            <Route path="add-project" element={<AddProject />} />
            <Route path="mosques" element={<Mosques />} />
            <Route path="add-mosque" element={<AddMosque />} />
            <Route path="blocked-projects" element={<BlockedProjects />} />
            <Route path="add-blocked-project" element={<AddBlockedProject />} />
          </Routes>
        </>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
