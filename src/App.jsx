import React, { useState } from "react";
import Youtube from "./component/Youtube";
import Player from "./component/Player";
import PlayList from "./component/PlayList";

function App() {
  const [playlist, setPlaylist] = useState([])
  const [URL, setUrl] = useState({})

  function createList(song){
    setPlaylist([...playlist, song])
  }
  return (
  <>
    <Player list={playlist} setUrl={setUrl} Url_call={URL}/>
    <Youtube setUrl={setUrl} createList={createList}/>
    <PlayList setUrl={setUrl} list={playlist}/>
  </>
  );
}

export default App;