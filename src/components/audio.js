import React from 'react';
import { useState } from 'react';
import audio from '../assets/cro-rockiando.mp3';
import ReactHowler from 'react-howler'
import Slide from 'react-reveal/Slide';


const Audio = (props) => {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
  }

  const handlePause = () => {
    setPlaying(false);
  }
  const { location } = props;
  
  return (
    <>
      <ReactHowler
        src={[audio]}
        playing={playing}
        volume={0.08}
      />
      <Slide left>
        <button 
          className={location.pathname === "/" ? "audio": "display-none"} 
          onClick={playing ? handlePause : handlePlay}><code>🍭 <span>Play/Stop</span></code></button>
      </Slide>
    </>
    )
}

export default Audio;