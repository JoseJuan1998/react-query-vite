import { useInfiniteQuery } from "react-query";
import { fetchColors } from "../services/api";

export default function InfiniteQueries() {
  const {
    isError,
    isFetching,
    isLoading,
    data,
    error,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) return pages.length + 1;
      return undefined;
    },
  });

  if (isLoading || isFetching) return <h2>Loading...</h2>;

  if (isError && error instanceof Error) return <h2>{error.message}</h2>;

  console.log({ data });

  return (
    <div>
      <h2>RQ Infinite Queries</h2>
      {data.pages.map((group) =>
        group.data.map((color) => (
          <p key={color.id}>
            {color.id}.- {color.label}
          </p>
        ))
      )}
      <button disabled={!hasNextPage} onClick={fetchNextPage}>
        Load more
      </button>
    </div>
  );
}
