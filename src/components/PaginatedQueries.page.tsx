import { useState } from "react";
import { useQuery } from "react-query";
import { fetchPaginatedColors } from "../services/api";

export default function PaginatedQueries() {
  const [page, setPage] = useState<number>(1);

  const { isLoading, isError, error, data } = useQuery(
    ["colors", page],
    () => fetchPaginatedColors(page),
    {
      keepPreviousData: true,
    }
  );

  const styleButton = {
    padding: "5px 20px",
    border: "none",
    backgroundColor: "gray",
    color: "white",
    fontSize: "1rem",
  };

  if (isLoading) return <h2>Loading...</h2>;

  if (isError && error instanceof Error) return <h2>{error.message}</h2>;

  return (
    <>
      <div>
        {data?.data.map((color: any) => {
          return (
            <div key={color.id}>
              <h2>{color.label}</h2>
            </div>
          );
        })}
      </div>
      <div>
        <button
          style={styleButton}
          hidden={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>
        <span style={{ padding: "10px", fontSize: "1.4rem" }}>{page}</span>
        <button
          style={styleButton}
          hidden={page === 4}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}
