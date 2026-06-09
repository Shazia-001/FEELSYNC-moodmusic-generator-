import { Astroid, Heart, X } from "lucide-react";

export default function PlaylistBox({ onClose }: { onClose: () => void }) {

  
    return (
        <div className="box box1">

          <div className="box-header">
            <div><X className="delete" onClick={onClose}/></div>
            <div className="playlistname">YOUR PLAYLIST</div>
            <div><Heart className="like"/></div>
          </div>

          <div className="boximg">
              <img className="boximage" src="https://i.pinimg.com/736x/9f/44/ea/9f44ea33d74edb760f98bee3d19d475c.jpg" alt="playlist cover" />
          </div>

          <div className="songlist">
            <ul>
              1. song 1 <br/>
              2. song 2 <br/>
              3. song 3 <br/>
              4. song 4 <br/>
              5. song 5 <br/>
            </ul>
          </div>

          <div className="header"> <Astroid/> TRY THIS <Astroid/> </div>

          <div className="activity">
            <img  className="boximageactivity" src="https://i.pinimg.com/736x/d8/88/b8/d888b85db43d42a45dfa617b3e39f4ed.jpg" alt="activity" />
            <div className="description">the description Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni eum laboriosam perspiciatis eius. Quibusdam, exercitationem cupiditate. Minima laudantium alias quibusdam voluptates! Tenetur autem dolores perferendis quidem quisquam ipsam qui sed!</div>
          </div>

          <div className="header">HAVE YOU READ THIS</div>
          <div className="book">
            <div className="description">
              <div className="genre">GENRE : horror</div>
              <a href="">link to the book</a>
              <div className="plot">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam illum non, possimus delectus iure tempore porro animi eaque esse aperiam cumque facere adipisci mollitia, perspiciatis dolorem eum sequi consequatur unde?</div>
            </div>
            <img src="https://i.pinimg.com/736x/21/7e/c7/217ec701ed017b31c2271181eaa1c275.jpg" alt="book" className="boximageactivity" />

          </div>
        </div>
    )
}