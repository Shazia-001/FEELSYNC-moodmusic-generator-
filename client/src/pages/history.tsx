import { Search } from "lucide-react";
import Navbar from "../componenets/Navbar";
import { motion } from "framer-motion";


export default function History() {
    return(
        <div>
            <Navbar/>

            <motion.div
                className="history"
                initial={{ opacity:0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut"}}
            >

                <div className="page">
                    <div className="title">History</div>

                    <div className="historyInputBox">
                        <input type="text" className="inputBox" />
                        <div className="historySearchbtn"><Search/></div>
                    </div>

                    <div className="date">yesterday</div>

                    <div className="table">

                        <div className="playlistHistory">
                            <div className="playlistTitle">chill vibes</div>
                            <div className="generatedTime">11:45</div>
                            <div className="vibes">pop . chill . lofi</div>
                        </div>

                    </div>
                </div>

            </motion.div>

        </div>
    )
}