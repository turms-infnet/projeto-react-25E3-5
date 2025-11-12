import React, { createContext, useContext } from "react";
import Authentication from "../services/Authentication";
import supabase from "../services/SupabaseClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);

    const checkAuth = async () => {
        const auth = await Authentication.isAuthenticated();
        console.log(auth)
        setIsAuthenticated(auth);
    }

    React.useEffect(() => {
        checkAuth();
    }, []);

    const login = async (email, password) => {
        const { data, error } = await Authentication.login(email, password);

        if (error) throw error;
        setIsAuthenticated(true);
        return { data, error };
    }

    const register = async (email, password) => {
        return await Authentication.register(email, password);
    }

    const logout = async () => {
        await Authentication.logout();
        setIsAuthenticated(false);
    }

    return <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext);
}