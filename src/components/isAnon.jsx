import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

export default function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>...Loading</p>;

  if (isLoggedIn) return <Navigate to="/" />;

  return children;
}
