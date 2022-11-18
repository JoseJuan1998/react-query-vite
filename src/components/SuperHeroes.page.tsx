import { Suspense, useEffect, useState } from "react";
import { IHero } from "../interfaces/IHero";
import { getSuperHeros } from "../services/api";

export default function SuperHeroes() {
  const [data, setData] = useState < IHero[] > ([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getSuperHeros()
      .then((superheroes) => {
        setData(superheroes.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (error) return <h2>{error}</h2>;

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Super Heroes Page</h2>
      <br />
      {data.map((hero) => (
        <p key={hero.id}>{hero.name}</p>
      ))}
    </div>
  );
}
