import { useOutletContext, Navigate, Outlet } from "react-router";

export default function AuthLogin() {
  const { isLoggedIn, theme, setTheme } = useOutletContext();

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={{ message: "Please login before accessing Post page" }}
      />
    );
  }

  return <Outlet context={{ theme, setTheme }} />;
}
