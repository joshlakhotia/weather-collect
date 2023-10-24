import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import jwtDecode from "jwt-decode";
import AuthContext from "./context/AuthContext";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Error from "./components/pages/Error";
import NotFound from "./components/pages/NotFound";
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import NavBar from "./components/NavBar";
import Forecasts from "./components/pages/Forecasts";
import CollectionForm from "./components/forms/CollectionForm";
import ForecastForm from "./components/forms/ForecastForm";
import Forecast from "./components/pages/Forecast";

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

        const {
            sub: username,
            authorities: roles,
            app_user_id: userId,
        } = jwtDecode(token);

        const user = {
            username,
            roles,
            token,
            userId,
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
                <main className="bg-dark min-vh-100">
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/forecasts" element={<Forecasts />} />
                        <Route
                            path="/collection-form"
                            element={<CollectionForm />}
                        />
                        <Route
                            path="/forecast-form"
                            element={<ForecastForm />}
                        />
                        <Route path="/forecast" element={<Forecast />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/error" element={<Error />} />
                        <Route
                            path="/login"
                            element={
                                !user ? (
                                    <Login />
                                ) : (
                                    <Navigate to="/" replace={true} />
                                )
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                !user ? (
                                    <Register />
                                ) : (
                                    <Navigate to="/" replace={true} />
                                )
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
