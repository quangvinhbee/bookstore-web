import { createContext, useContext } from "react";

export const AuthContext = createContext<{}>({});

export function AuthProvider() {
  return <AuthContext.Provider value={{}}></AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
