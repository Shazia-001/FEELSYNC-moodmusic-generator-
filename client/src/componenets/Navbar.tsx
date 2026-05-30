import { AudioWaveform } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Navbar() {

  const { user, logout } = useAuth();
  console.log("navbar user: ", user);

  

  const navigate = useNavigate(); 

  const handlelogout = () => {
    logout();
    navigate("/login");
  }

    return (

      

      <nav className="nav">

        <Link to="/" className="logo">
          <div className="logo">
            <AudioWaveform className="logoimg"/>
            <h1 className="logoname">FEELSYNC <span className="dot">.</span></h1>
          </div>
        </Link>
        

        <div className="navlinks">
          {user ? (
            <>

              <span className="login">{user.name}</span>
              <button className="signup" onClick={handlelogout}>logout</button>
            </>
          ) : (
            <>
              <button className="login" onClick={() => navigate("/login")}>LOG IN</button>
              <button className="signup" onClick={() => navigate("/signup")}>SIGN UP</button>
            </>
          )}
        </div>

      </nav>
    )
}