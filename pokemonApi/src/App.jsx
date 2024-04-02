import "./index.css";
import PokemonPage from "./pages/PokemonPage";
import PokemonPageV2 from "./pages/PokemonPageV2";

const App = () => {
  return (
    <>
      {/* <PokemonPage /> */}
      <PokemonPageV2 />
    </>
  );

  // const [currentPageUrl, setCurrentPageUrl] = useState(
  //   "https://pokeapi.co/api/v2/pokemon"
  // );
  // const [nextPageUrl, setNextPageUrl] = useState();
  // const [prevPageUrl, setPrevPageUrl] = useState();
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setLoading(true);
  //   axios.get(currentPageUrl).then((res) => {
  //     setLoading(false);
  //     setNextPageUrl(res.data.next);
  //     setPrevPageUrl(res.data.previous);
  //     setPokemon(res.data.results.map((p) => p.name));
  //   });
  //   return () => {};
  // }, [currentPageUrl]);
  // const gotoNextPage = () => {
  //   setCurrentPageUrl(nextPageUrl);
  // };
  // const gotoPrevPage = () => {
  //   setCurrentPageUrl(prevPageUrl);
  // };
  // if (loading) return "Loading ...";
  // return (
  //   <>
  //     <PokemonList pokemon={pokemon} />
  //     <Pagination
  //       gotoNextPage={nextPageUrl ? gotoNextPage : null}
  //       gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
  //     />
  //   </>
  // );
};

export default App;
