import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProjectsPage from "../pages/ProjectsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/projects" element={<ProjectsPage />} />
    </Routes>
  );
}

export default AppRoutes;