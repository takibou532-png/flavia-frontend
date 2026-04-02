import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const res = await fetch("https://flavia-backend.onrender.com/admin/me", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setAdmin(data);
        setIsAuthenticated(true);
      } else {
        setAdmin(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      setAdmin(null);
      setIsAuthenticated(false);
    }
  };

const login = async (email, password) => {
  const res = await fetch("https://flavia-backend.onrender.com/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Invalid credentials");

  
  


await fetchMe();
};

  const logout = async () => {
    try{ 
    const res= await axios.post("https://flavia-backend.onrender.com/admin/logout",{},
      {withCredentials:true,
         headers: { "Content-Type": "application/json" }
      }
      
      
     )
    setAdmin(null);
    setIsAuthenticated(false);
    return true;
  }catch (err){
    console.error("logout error => "+err)
    return false;
  }
}

  useEffect(() => {
    fetchMe().finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


