import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicSite from "./pages/PublicSite";
import AdminPage from "./pages/AdminPage";
import AdminLogin from "./pages/AdminLogin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProjectsPage from "./pages/ProjectsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicSite />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />
        <Route path="/admin" element={<AdminPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;