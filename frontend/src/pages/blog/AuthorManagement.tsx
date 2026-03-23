import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

function AuthorManagement() {
  const { userId, email, role, token } = useAuthStore();
  console.log(userId, email, role, token);
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
