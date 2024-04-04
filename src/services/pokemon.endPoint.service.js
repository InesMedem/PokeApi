import { APIPokemon } from "./pokemonApi.config";

export const getById = async (id) => {
  return APIPokemon.get(
    `pokemon/${id}`.then((res) => res).catch((error) => error)
  );
};
