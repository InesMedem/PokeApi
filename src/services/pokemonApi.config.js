import axios from "axios";

const apiHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const APIPokemon = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  headers: apiHeaders,
  timeout: 60000000000,
});
