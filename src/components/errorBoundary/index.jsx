import { useRouteError, useNavigate } from "react-router";
import { useEffect } from "react";

export const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    if (error?.status === 401) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, navigate]);

  if (error?.status === 401) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-800 mb-4">
            Session Expired
          </h1>
          <p className="text-stone-600 mb-4">
            Your session has expired. Please log in again.
          </p>
          <p className="text-sm text-stone-500">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-stone-800 mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-stone-600">
          {error?.statusText || error?.message || "Unknown error"}
        </p>
      </div>
    </div>
  );
};
