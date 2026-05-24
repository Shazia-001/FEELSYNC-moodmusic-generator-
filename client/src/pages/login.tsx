import { motion } from "framer-motion"
import Navbar from "../componenets/Navbar"
import { Link } from "react-router-dom"

export default function Login () {
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
                
                <div className="loginbox">

                    <div className="headerlogin">LOGIN</div>

                    <div className="authsubboxes">
                        <label htmlFor="Email"></label>
                        <input type="text" placeholder="Email" id="Email" className="authinput"/>
                    </div>

                    <div className="authsubboxes">
                        <label htmlFor="password"></label>
                        <input type="password" placeholder="password" className="authinput"/>
                    </div>

                    <button type="submit" className="authbtn">LOGIN</button>
                    <div className="authtext">Don't have an account?<Link to={"/signup"} > Sign Up </Link></div>
                </div>
        
            </motion.div>
        </div>
    )
}