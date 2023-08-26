import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import NavBar, { Favorites, Search, SearchResult } from "./components/NavBar";
import { allCharacters } from "../data/data";
import { useDebugValue, useEffect, useState } from "react";
import Loader from "./components/Loader";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`,
          { signal }
        );
        setCharacters(data.results.slice(0, 5));
      } catch (err) {
        if (!axios.isCancel()) {
          setCharacters([]);
          if (err.response === undefined) return;
          toast.error(err.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    // if (query.length < 3) {
    //   setCharacters([]);
    //   return;
    // }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [query]);

  const handleSelect = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };
  const handleAddFavorites = (character) => {
    setFavorites((prev) => [...prev, character]);
  };

  const isAddToFavorites = favorites.map((fav) => fav.id).includes(selectedId);
  // console.log(isAddToFavorites, selectedId, favorites);

  return (
    <div className="app">
      <Toaster />
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favorites numOfFavorites={favorites.length} />
      </NavBar>
      <div className="main">
        {/* {isLoading ? <Loader /> : <CharacterList characters={characters} />} */}
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          onSelect={handleSelect}
        />
        <CharacterDetail
          selectedId={selectedId}
          onAddFavorites={handleAddFavorites}
          isAddToFavorites={isAddToFavorites}
        />
      </div>
    </div>
  );
}
export default App;
