import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroesData";

export default function RQSuperHero() {
  const { heroId } = useParams();

  const { data, isLoading, isFetching, isError, error } = useSuperHeroData(
    parseInt(heroId || "1")
  );

  if (isLoading || isFetching) return <h2>Loading...</h2>;

  if (isError && error instanceof Error) return <h2>{error.message}</h2>;

  return (
    <div>
      <h2>RQ Super Hero</h2>
      <br />
      <ul>
        <li>
          <b>Name:</b> {data.name}
        </li>
        <li>
          <b>Alter Ego</b> {data.alterEgo}
        </li>
      </ul>
    </div>
  );
}
