import { Link } from "react-router-dom";
import Navbar from "../componenets/Navbar";
import { motion } from "framer-motion";
import { useState } from "react";


export default function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/signup" , {
            method: "POST",

            headers: {
                "Content-Type" : "application/json"
            },

            body: JSON.stringify({
                email,
                name,
                password,
            }),


        })

        const data = await response.json();

        console.log(data);
    }



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
                <form onSubmit={handleSignup} className="loginbox">

                    <div className="headerlogin">JOIN US</div>

                    <div className="authsubboxes">
                        <label htmlFor="name"></label>
                        <input 
                            type="name" 
                            value={name}
                            placeholder="Name" 
                            onChange={(e) => setName(e.target.value)}
                            id="name" 
                            className="authinput"
                        />
                    </div>

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
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)}
                            id="password" 
                            className="authinput"
                        />
                    </div>

                    <button type="submit" className="authbtn">SIGN UP</button>
                    <div className="authtext">Already have an account? <Link to={"/login"} >Login</Link></div>
                </form>
 
            </motion.div>
        </div>
    )
}