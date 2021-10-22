import axios from "axios";
import { createContext, useContext } from "react";

export const AuthContext = createContext<{
  registerUser?: (
    displayName: string,
    email: string,
    password: string
  ) => Promise<any>;
}>({});

export function AuthProvider(props) {
  const registerUser = async (
    displayName: string,
    email: string,
    password: string
  ) => {
    return await axios.post("/api/v1/auth/createUser", {
      displayName: displayName,
      email: email,
      password: password,
    });
  };
  return (
    <AuthContext.Provider value={{ registerUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
