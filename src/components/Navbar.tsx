import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/super-heroes"}>Super Heroes</Link>
        </li>
        <li>
          <Link to={"/rq-super-heroes"}>RQ Super Heroes</Link>
        </li>
        <li>
          <Link to={"/rq-parallel"}>RQ Parallel Queries</Link>
        </li>
        <li>
          <Link to={"/rq-dynamic-parallel"}>RQ Dynamic Parallel Queries</Link>
        </li>
        <li>
          <Link to={"/rq-dependent"}>RQ Dependent Queries</Link>
        </li>
        <li>
          <Link to={"/rq-paginated"}>RQ Paginated Queries</Link>
        </li>
        <li>
          <Link to={"/rq-infinite"}>RQ Infinite Queries</Link>
        </li>
      </ul>
    </nav>
  );
}
