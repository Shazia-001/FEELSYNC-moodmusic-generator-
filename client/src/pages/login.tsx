import { motion } from "framer-motion"
import Navbar from "../componenets/Navbar"
import { Link } from "react-router-dom"
import { useState } from "react";

export default function Login () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) :  Promise<void> => {
        e.preventDefault();

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

        const data: unknown = await response.json();

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
                
                <form className="loginbox" onSubmit={handleSubmit}>

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

                    <button type="submit" className="authbtn">LOGIN</button>
                    <div className="authtext">Don't have an account?<Link to={"/signup"} > Sign Up </Link></div>
                </form>
        
            </motion.div>
        </div>
    )
}