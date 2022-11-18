import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";
import { IHero } from "../interfaces/IHero";

export default function RQSuperHeroes() {
  const [name, setName] = useState<string>("");

  const [alterEgo, setAlterEgo] = useState<string>("");

  const {
    data: heroes,
    isLoading,
    isError,
    error,
    isFetching,
  } = useSuperHeroesData();

  const { mutate } = useAddSuperHeroData({ name, alterEgo });

  if (isLoading || isFetching) return <h2>Loading...</h2>;

  if (isError && error instanceof Error) return <h2>{error.message}</h2>;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    mutate({ name, alterEgo });

    setName("");
    setAlterEgo("");
  }

  function handleChange(e: FormEvent<HTMLInputElement>) {
    const current = e.currentTarget;
    if (current.name === "name") return setName(current.value);
    return setAlterEgo(current.value);
  }

  return (
    <div className="rq-super-heroes">
      <h2>RQ Super Heroes Page</h2>
      <br />
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="name"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="alterEgo"
            name="alterEgo"
            value={alterEgo}
            onChange={handleChange}
          />
          <button type="submit">Save</button>
        </form>
      </div>
      <br />
      {heroes.map((hero: IHero) => (
        <Link to={`/rq-super-heroes/${hero.id}`} key={hero.id}>
          {hero.name}
        </Link>
      ))}
    </div>
  );
}
