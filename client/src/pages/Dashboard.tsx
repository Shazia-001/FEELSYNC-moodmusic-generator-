import Navbar from "../componenets/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/useAuth";
import { Bot, Sparkles } from "lucide-react";
import { useState } from "react";
import PlaylistBoxEdit from "../componenets/playlistboxedit";

type Playlist = {
  name: string;
  image: string;
  description: string;
  songs?: string[];
};

export default function Dashboard() {

    const { user } = useAuth();
    const [showplaylist, setShowplaylist] = useState(false);
    const [mood, setMood] = useState("");
    const [loading, setLoading] = useState(false);
    const [playlist, setPlaylist] = useState<Playlist | null>(null);




    const generatePlaylist = async () => {

        if (!mood.trim()) return;
        setLoading(true);
        console.log("loading started", loading);
        

        const res = await fetch("http://localhost:3000/generate-playlist", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ mood }),
        })
        
        const data = await res.json();
        setPlaylist(data);
        setShowplaylist(true);
        setLoading(false);
    }



    return (
        <div>
            <Navbar/>
            <motion.div
                className="dashboard"
                initial={{ opacity:0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut"}}
            >
                <div className="page">

                    <div className="hello">HEY THERE <span className="name">{user?.name?.toUpperCase()}</span> !</div>

                    <div className="PlaylistGenerator">

                        <div className="generateBox">

                            <div className="bot"><Bot className="bot icon"/></div>

                            <div className="question">How are you feeling today <span className="dot">?</span></div>

                            <div className="generateBoxInput">
                                <input type="text" className="inputBox" value={mood} onChange={(e) => setMood(e.target.value)}/>
                                <button className="generateBtn" onClick={generatePlaylist}><Sparkles/></button>
                            </div>

                        </div>
                    </div>

                </div>

                <AnimatePresence>
                    {showplaylist && <motion.div
                     className="popup"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <PlaylistBoxEdit
                            PlaylistName={playlist?.name || "Your Playlist"}
                            image={playlist?.image || "https://placehold.co/300x300"}
                            description={playlist?.description || "A playlist to match your mood"}
                            imageActivity={"https://placehold.co/300x200"}
                            genre={"Genre: Pop"}
                            plot={"A brief plot of the book goes here."}
                            imageBook={"https://placehold.co/200x300"}
                            onClose={() => setShowplaylist(false)} 
                        />
                    </motion.div>}
                </AnimatePresence>
                
        
            </motion.div>
        </div>
    )
}
