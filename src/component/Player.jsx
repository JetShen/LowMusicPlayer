import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";

function Player(prop) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumen, setVolumen] = useState(1);
  const [prgss, setPrgss] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(null);
  const [first, setFirst] = useState(true)
  const [index, setIndex] = useState(0)
  const playerRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };
  const handleStop = () => {
    setIsPlaying(false);
  };

  const handleProgres = (e) => {
    setPrgss(e.playedSeconds);
  };
  const handleDuration = (e) => {
    setDuration(e);
  };

  useEffect(() => {
    if (seekTime !== null) {
      setPrgss(seekTime);
      playerRef.current.seekTo(seekTime);
      setSeekTime(null);
    }
  }, [seekTime]);

  const handlePlaylist = (index) => {
    let song;
    song = prop.list[index+1]
    if (typeof song !== "undefined") {
      prop.setUrl({
        soundURL: song.soundURL,
        title: song.title
      })
      setIndex(index+1)
      ;}
  };
  

  return (
    <>
      <ReactPlayer
        url={prop.Url_call.soundURL}
        playing={isPlaying}
        width={0}
        height={0}
        volume={volumen}
        onProgress={handleProgres}
        onDuration={handleDuration}
        ref={playerRef}
        onEnded={() => handlePlaylist(index) }
      />
      <p>{prop.Url_call.title}</p>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handleStop}>Stop</button>
      <input
        type="range"
        min="0.0"
        max="1.0"
        step="0.01"
        value={volumen}
        onChange={(e) => setVolumen(parseFloat(e.target.value))}
      />
      <input 
        type="range" 
        min="0" 
        max={duration} 
        value={seekTime !== null ? seekTime : prgss} 
        step="1"
        onChange={(e) => setSeekTime(parseFloat(e.target.value))}
      />
    </>
  );
}

export default Player;
