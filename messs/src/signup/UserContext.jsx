import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/me", {
          method: "GET",
          credentials: "include", // ⬅️ Ensures cookies are sent
        });
    
        console.log("Cookies sent:", document.cookie);
        if (!response.ok) throw new Error("Unauthorized");
        
        const data = await response.json();
        console.log("User Data:", data);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };
    

    fetchUser();
  }, []); // ✅ Runs only once on mount

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
