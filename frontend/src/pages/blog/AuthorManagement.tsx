import { Link } from "react-router-dom";

function AuthorManagement() {
  return (
    <div>
      <h1>Author management</h1>
      <Link className="btn" to={"/blog"}>
        My blog
      </Link>
      <Link className="btn" to={"/blog/new"}>
        Create blog
      </Link>
    </div>
  );
}

export default AuthorManagement;
