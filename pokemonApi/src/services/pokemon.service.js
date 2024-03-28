import { axiosUtil } from "../utils/axiosUtil";

export const getByIdPokemon = async (id) => {
  const optionsRequest = {
    method: "GET",
    url: `https://pokeapi.co/api/v2/pokemon/${id}`,
  };
  return await axiosUtil(optionsRequest);
};
