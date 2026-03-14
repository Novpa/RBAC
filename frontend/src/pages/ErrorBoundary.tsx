import { useNavigate, useRouteError } from "react-router-dom";

function ErrorBoundary() {
  const error: any = useRouteError();
  const navigate = useNavigate();
  return (
    <div>
      <h1>{error.data || error.message}</h1>
      <button onClick={() => navigate(-1)}>Previous page</button>
    </div>
  );
}

export default ErrorBoundary;
