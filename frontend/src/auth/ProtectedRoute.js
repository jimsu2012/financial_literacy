import { Route } from "react-router-dom";
import { Redirect } from "react-router";

export default function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route
      {...props}
      render={(rp) => {
        return localStorage.getItem("token") == null ? (
          <Redirect to="/login" />
        ) : (
          <Component {...rp} />
        );
      }}
    />
  );
}
