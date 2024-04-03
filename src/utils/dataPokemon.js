import { getByIdPokemon } from "../services/pokemon.service";

//!---------------------------------------------------

let dataGlobal;
export const dataPokemon = async () => {
  const rawData = [];
  for (let i = 1; i < 151; i++) {
    rawData.push(await getByIdPokemon(i));
  }
  return dataMap(rawData);
};

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