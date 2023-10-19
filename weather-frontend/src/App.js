import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import jwtDecode from "jwt-decode";
import AuthContext from "./context/AuthContext";

const LOCAL_STORAGE_TOKEN_KEY = "weatherToken";

function App() {
    const [user, setUser] = useState(null);
    const [restoreLoginAttempteComplete, setrestoreLoginAttempteComplete] =
        useState(false);

    useEffect(() => {
        const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
        if (token) {
            login(token);
        }
        setrestoreLoginAttempteComplete(true);
    }, []);

    const login = (token) => {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

        const { sub: username, authorities: roles } = jwtDecode(token);

        const user = {
            username,
            roles,
            token,
            hasRole(role) {
                return this.roles.includes(role);
            },
        };

        console.log(user);

        setUser(user);

        return user;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    };

    const auth = {
        user: user ? { ...user } : null,
        login,
        logout,
    };

    if (!restoreLoginAttempteComplete) {
        return null;
    }

    return (
        <AuthContext.Provider value={auth}>
            <Router>
                <main className="container"></main>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
