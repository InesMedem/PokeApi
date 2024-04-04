import { getById } from "../services/pokemon.endPoint.service";
import { getByIdPokemon } from "../services/pokemon.service";

//!---------------------------------------------------

export const dataPokemon = async () => {
  const dataApi = [];

  for (let i = 1; i < 41; i++)
    try {
      const { dataFetch, state, isLoading, hasError, data } = useFetching(
        getById,
        i
      );
    } catch (error) {}
  console.log("🚀 ~ dataPokemon ~ dataApi:", dataApi);

  return (mappeoData = (dataApi) => {});
};

const mappeoData = (data) => {};

//!---------------------------------------------------

// let dataGlobal;
// export const dataPokemon = async () => {
//   const rawData = [];
//   for (let i = 1; i < 151; i++) {
//     rawData.push(await getByIdPokemon(i));
//   }
//   return dataMap(rawData);
// };

//!---------------------------------------------------

export const typePokemon = (data) => {
  const nameType = [];
  data.forEach((element) => {
    element.type.forEach((singleType) => {
      !nameType.includes(singleType.type.name) &&
        nameType.push(singleType.type.name);
    });
  });

  return nameType;
};

//!---------------------------------------------------

const dataMap = (data) => {
  const filterData = data.map((pokemon) => ({
    name: pokemon.name,
    image: pokemon.sprites.other.dream_world.front_default,
    type: pokemon.types,
    id: pokemon.id,
  }));

  const types = typePokemon(filterData);
  dataGlobal = {
    pokemonData: filterData,
    type: types,
  };

  return dataGlobal;
};
