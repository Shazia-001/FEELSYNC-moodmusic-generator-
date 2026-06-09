import { motion } from "framer-motion"
import Navbar from "../componenets/Navbar"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";


export default function Login () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
            if (!error) return;

            const timer = setTimeout(() => {
                setError("");
            }, 3000);

            return () => clearTimeout(timer);
        }, [error]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) :  Promise<void> => {
        e.preventDefault();

        setLoading(true);
        setError("");


        try {
            const response = await fetch("http://localhost:3000/login", {
                method : "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data= await response.json();
            setError("");


            if (!response.ok){
                setError(data.message);
                return
            }

            localStorage.setItem("token", data.token);
            setUser(data.user);
            navigate("/dashboard")
        
        } catch(err) {
            setError("something went wrong");
            
            console.log(err)
        }finally {
            setLoading(false);
        }


        const token = localStorage.getItem("token");

        const meRes = await fetch("http://localhost:3000/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        const meData = await meRes.json();
        console.log("ME:", meData);
    };




    return(
        <div>
            <Navbar/>
            <motion.div
                className="authpage"
                initial={{ opacity:0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut"}}
            >
                
                <form className="loginbox" onSubmit={handleLogin}>

                    <div className="headerlogin">LOGIN</div>

                    <div className="authsubboxes">

                        <label htmlFor="Email"></label>
                        <input
                            type="email" 
                            value={email}
                            placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value)}
                            id="Email" 
                            className="authinput"
                        />

                    </div>

                    <div className="authsubboxes">

                        <label htmlFor="password"></label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password" 
                            className="authinput"
                        />

                    </div>

                    {error && <div className="error-text">Invalid Password / Email</div>}
                    
                    <button type="submit" className="authbtn" disabled={loading}>{loading ? "loading..." : "LOGIN" } </button>

                    <div className="authtext">Don't have an account? <Link to={"/signup"}>Sign Up</Link></div>


                     
                </form>
        
            </motion.div>
        </div>
    )
}