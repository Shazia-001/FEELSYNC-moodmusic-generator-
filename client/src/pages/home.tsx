
import Navbar from "../componenets/Navbar";
import PlaylistBox from "../componenets/playlistbox";
import EmotionSlider from "../effects/Emotionslider";
import { motion } from "framer-motion"


export default function Home(){
    return (
        <div>
            <Navbar/>
            <motion.div 
                className="home"
                initial={{ opacity:0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut"}}
            >
    
                <div className="header">CHOOSE A MOOD</div>
                <EmotionSlider/>
          
                <div className="header">GET A PLAYLIST</div>
    
                <PlaylistBox/>
    
                <div className="header">WITH AN ACTIVITY</div>
                
    
                <div className="header">AND A BOOK TO READ</div>
    
            </motion.div>
        </div>
    )
}