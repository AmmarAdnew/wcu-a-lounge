import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import AdminLogIn from "./pages/Admin/AdminLogIn";
import UserLogIn from "./pages/UserLogIn";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import MenuManagement from "./components/MenuManagement";
import OrderManagement from "./components/OrderManagement";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import "./components/Loader.css";

function ProtectedRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/admin" replace />;
}

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Initialize Firebase Auth state listener to handle session persistence
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsLoading(false); // Authentication state determined
    });
    return () => unsubscribe(); // Clean up listener on component unmount
  }, []);

  const isAdmin = user?.email === "admin@gmail.com"; // Replace with your logic to verify admin

  // Show a loading indicator while waiting for the auth state
  if (isLoading) {
    return <div className="center">
      <div className="content">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="bars">
          {[...Array(7)].map((_, b) => (
            <div key={b} className="bar" />
          ))}
        </div>
      ))}
    </div>;

    </div>
    
  }

  // If there's no user, navigate to the admin login
  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/admin" element={<AdminLogIn />} />
          <Route path="/userlogin" element={<UserLogIn />} />
          <Route path="*" element={<Navigate to="/admin" replace />} /> {/* Redirect any other route to admin */}
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route index element={<LandingPage />} />
        <Route path="/admin" element={<AdminLogIn />} />
        <Route path="/userlogin" element={<UserLogIn />} />

        {/* Protected Routes */}
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute isAuthenticated={isAdmin}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/MenuSection"
          element={
            <ProtectedRoute isAuthenticated={isAdmin}>
              <MenuManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/OrderSection"
          element={
            <ProtectedRoute isAuthenticated={isAdmin}>
              <OrderManagement />
            </ProtectedRoute>
          }
        />
         <Route path="*" element={<Navigate to="/admindashboard" replace />} /> {/* Redirect any other route to admindashboard */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
