import axios from "../utils/axios-utils";
import { IHero } from "../interfaces/IHero";

export const getSuperHeros = async () => {
  return await axios.get("http://localhost:4000/superheroes");
};

export const getSuperHero = async (id: number) => {
  return await axios.get(`http://localhost:4000/superheroes/${id}`);
};

export const addSuperHero = async (hero: IHero) => {
  return await axios.post("http://localhost:4000/superheroes", hero);
};

export const fetchUserByEmail = async (email: string) => {
  return await axios.get(`http://localhost:4000/users/${email}`);
};

export const fetchChannel = async (channelId: string) => {
  return await axios.get(`http://localhost:4000/channels/${channelId}`);
};

export const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

export const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

export const fetchPaginatedColors = (page: number) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${page}`);
};
