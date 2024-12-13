import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import AdminLogIn from "./pages/Admin/AdminLogIn";
import UserLogIn from "./pages/UserLogIn";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import MenuManagement from "./components/MenuManagement";
import OrderManagement from "./components/OrderManagement";

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          {/* <Route path="/download" element={<DownloadApp/>} /> */}
          <Route path="/admin" element={<AdminLogIn />} />
          <Route path="/userlogin" element={<UserLogIn />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
        </Routes>

        <Routes>
          <Route path="/admin/MenuSection" element={<MenuManagement/>} />
          <Route path="/admin/OrderSection" element={<OrderManagement/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
