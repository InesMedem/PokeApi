import { useEffect, useState } from "react";
import useFetching from "../hooks/useFetching";
import { getById } from "../services/pokemon.endPoint.service";

const GalleryPokemon = () => {
  const [dataPage, setDataPage] = useState(null);
  // const { dataFetch, state, hasError, isLoading, data } = useFetching(
  //   getById(1)
  // );

  const getData = () => 


  const getData = async () => {};
  useEffect(() => {
    getData();
    return () => {};
  }, []);

  return <div>{console.log(state)}</div>;
};

export default GalleryPokemon;
