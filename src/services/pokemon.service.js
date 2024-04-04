import axios from "axios";
import { axiosUtil } from "../utils/axiosUtil";

export const getAllPokemon = async () => {
  const response = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=1118"
  );
  return response.data;
};

export const getByIdPokemon = async (id) => {
  const optionsRequest = {
    method: "GET",
    url: `https://pokeapi.co/api/v2/pokemon/${id}`,
  };

  return await axiosUtil(optionsRequest);
};

export const getByTypePokemon = async () => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type/");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching Pokémon types:", error);
    return [];
  }
};
