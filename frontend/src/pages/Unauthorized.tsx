import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Access denied</h1>
      <button className="btn" onClick={() => navigate(-1)}>
        Previous page
      </button>
    </div>
  );
}

export default Unauthorized;
