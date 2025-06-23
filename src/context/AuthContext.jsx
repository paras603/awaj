import { createContext, useContext, useEffect, useState } from "react"
import { getToken, removeToken, saveToken } from "../auth/tokenService";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const token = getToken();
        const user = localStorage.getItem("authUser");

        if (token && user){
            setAuthUser(JSON.parse(user));
        }
    }, []);

    const login = (user, token) => {
        saveToken(token);
        localStorage.setItem("authUser", JSON.stringify(user));
        setAuthUser(user);
    }

    const logout = () => {
        removeToken();
        localStorage.removeItem("authUser");
        setAuthUser(null);
    }

    return (
        <AuthContext.Provider value={{ authUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);