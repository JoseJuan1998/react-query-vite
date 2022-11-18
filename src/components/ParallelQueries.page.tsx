import axios from "axios";
import { useQuery } from "react-query";
import { fetchFriends, fetchSuperHeroes } from "../services/api";

export default function ParallelQueries() {
  const { data: superHeroes } = useQuery("super-heroes", fetchSuperHeroes, {
    select: (superHeroes) => superHeroes.data,
  });

  const { data: friends } = useQuery("friends", fetchFriends, {
    select: (friends) => friends.data,
  });

  friends && console.log(friends);
  superHeroes && console.log(superHeroes);

  return <h2>RQ Parallel Queries</h2>;
}
