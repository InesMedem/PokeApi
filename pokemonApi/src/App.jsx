import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setcurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  // "https://pokeapi.co/api/v2/pokemon"

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(res.data.results.map((p) => p.name));
      });

    return () => {
      cancel();
    };
  }, [currentPageUrl]);

  if (loading) return "Loading ...";

  return <PokemonList pokemon={pokemon} />;
};

export default App;
