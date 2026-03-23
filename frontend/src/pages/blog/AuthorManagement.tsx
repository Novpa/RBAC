import { Link } from "react-router-dom";

function AuthorManagement() {
  return (
    <div>
      <h1>Author management</h1>
      <Link className="btn" to={"/blog"}>
        Blog
      </Link>
    </div>
  );
}

export default AuthorManagement;
