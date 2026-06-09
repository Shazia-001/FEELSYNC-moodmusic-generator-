import { AudioWaveform, TextAlignJustify, UserCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  console.log("navbar user: ", user);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handlelogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="nav">
      <Link to="/" className="logo">
        <div className="logo">
          <AudioWaveform className="logoimg" />
          <h1 className="logoname">
            FEELSYNC <span className="dot">.</span>
          </h1>
        </div>
      </Link>

      <div className="navlinks">
        {user ? (
          <>
            <div className="navlinks">
              <span className="user">
                <UserCircle className="user" />
              </span>
              <button className="menu-btn " onClick={() => setOpen(!open)}>
                {open ? (
                  <X className="menubtn" />
                ) : (
                  <TextAlignJustify className="menubtn" />
                )}
              </button>
            </div>
            <div className={`links ${open ? "active" : ""}`}>
              <button
                className="nav-btn margintop"
                onClick={() => navigate("/dashboard")}
              >
                Home
              </button>
              <button className="nav-btn" onClick={() => navigate("/history")}>
                History
              </button>
              <button className="nav-btn" onClick={() => navigate("/liked")}>
                Liked
              </button>
              <button className="nav-btn" onClick={handlelogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <button className="login" onClick={() => navigate("/login")}>
              LOG IN
            </button>
            <button className="signup" onClick={() => navigate("/signup")}>
              SIGN UP
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
