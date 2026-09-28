import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicSite from "./pages/PublicSite";
import AdminPage from "./pages/AdminPage";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicSite />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;