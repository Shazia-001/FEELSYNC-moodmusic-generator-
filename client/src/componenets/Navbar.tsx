import { AudioWaveform } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Navbar() {

  const navigate = useNavigate(); 

    return (
      <nav className="nav">

        <Link to="/" className="logo">
          <div className="logo">
            <AudioWaveform className="logoimg"/>
            <h1 className="logoname">FEELSYNC <span className="dot">.</span></h1>
          </div>
        </Link>
        

        <div className="navlinks">
          <button className="login" onClick={() => navigate("/login")}>LOG IN</button>
          <button className="signup" onClick={() => navigate("/signup")}>SIGN UP</button>
        </div>

      </nav>
    )
}