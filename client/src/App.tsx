import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./componenets/ProtectedRoutes";
import GuestRoute from "./componenets/GuestRoute";
import History from "./pages/history";





function App() {
 
  return (
    
    <div className="main">
      
      <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        } />

        <Route path="/signup" element={
          <GuestRoute>
            <Signup/>
          </GuestRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        } />
        
        <Route path="/history" element={
          <ProtectedRoute>
            <History/>
          </ProtectedRoute>
        } />

      </Routes>
    
    </BrowserRouter>
    </div>
  )
}

export default App
