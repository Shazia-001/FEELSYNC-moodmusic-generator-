import { Astroid, Heart, X } from "lucide-react";


type PlaylistBoxProps = {
  PlaylistName: string;
  image: string;
  description: string;
  imageActivity: string;
  genre: string;
  plot: string;
  imageBook: string;
  onClose: () => void;
};

export default function PlaylistBoxEdit({
  PlaylistName,
  image,
  description,
  imageActivity,
  genre,
  plot,
  imageBook,
  onClose,
}: PlaylistBoxProps) {


    return (
        <div className="box">

          <div className="box-header">
            <div><X className="delete" onClick={onClose}/></div>
            <div className="playlistname">{PlaylistName}</div>
            <div><Heart className="like"/></div>
          </div>

          <div className="boximg">
              <img className="boximage" src={image} alt="playlist cover" />
          </div>

          <div className="songlist">
            <ul>
              <li>song 1</li>
            </ul>
          </div>

          <div className="header"> <Astroid/> TRY THIS <Astroid/> </div>

          <div className="activity">
            <img  className="boximageactivity" src={imageActivity} alt="activity" />
            <div className="description">{description}</div>
          </div>

          <div className="header">HAVE YOU READ THIS</div>
          <div className="book">
            <div className="description">
              <div className="genre">{genre}</div>
              <a href="">link to the book</a>
              <div className="plot">{plot}</div>
            </div>
            <img src={imageBook} alt="book" className="boximageactivity" />

          </div>
        </div>
    )
}