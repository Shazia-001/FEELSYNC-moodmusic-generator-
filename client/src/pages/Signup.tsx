import { Link } from "react-router-dom";
import Navbar from "../componenets/Navbar";
import { motion } from "framer-motion";


export default function Signup() {
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

                    <div className="headerlogin">JOIN US</div>

                    <div className="authsubboxes">
                        <label htmlFor="name"></label>
                        <input type="text" placeholder="Name" id="name" className="authinput"/>
                    </div>

                    <div className="authsubboxes">
                        <label htmlFor="Email"></label>
                        <input type="text" placeholder="Email" id="Email" className="authinput"/>
                    </div>

                    <div className="authsubboxes">
                        <label htmlFor="password"></label>
                        <input type="password" placeholder="Password" className="authinput"/>
                    </div>

                    <button type="submit" className="authbtn">SIGN UP</button>
                    <div className="authtext">Already have an account? <Link to={"/login"} >Login</Link></div>
                </div>
 
            </motion.div>
        </div>
    )
}