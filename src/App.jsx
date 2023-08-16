import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import NavBar from "./components/NavBar";
import { allCharacters } from "../data/data";
import { useState } from "react";

function App() {
  const [characters, setCharacters] = useState(allCharacters);
  return (
    <div className="app">
      <NavBar numOfResult={characters.length} />
      <div className="main">
        <CharacterList characters={characters} />
        <CharacterDetail />
      </div>
    </div>
  );
}
export default App;
