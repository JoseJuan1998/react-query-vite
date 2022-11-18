import { useQueries } from "react-query";
import { getSuperHero } from "../services/api";

interface Props {
  heroIds: number[];
}

export default function DynamicParallelQueries({ heroIds }: Props) {
  const queryResult = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => getSuperHero(id),
        select: (data: any) => {
          return data.data;
        },
      };
    })
  );

  queryResult && console.log(queryResult);

  return <h2>RQ Dynamic Parallel Queries</h2>;
}
