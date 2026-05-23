import { Angry, Frown, HandMetal, Heart, HeartCrack, Laugh, Smile,  } from "lucide-react";
const icons = (
  <>
    <Angry className="emotion anger" />
    <Frown className="emotion frown" />
    <Laugh className="emotion laugh" />
    <Smile className="emotion smile" />
    <HeartCrack className="emotion heartcrack" />
    <Heart className="emotion heart" />
    <HandMetal className="emotion handmetal" />
  </>
);

export default function EmotionSlider() {
  return (
    <div className="slider">
      <div className="slide-track">
        {icons}
        {icons}
        {icons}
        {icons}
        {icons}
        {icons}
        {icons}
        {icons}
      </div>
    </div>
  );
}
