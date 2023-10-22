import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Error from "../pages/Error";
import AuthContext from "../../context/AuthContext";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:8080/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (response.status === 200) {
            const { jwt_token, userId } = await response.json();
            console.log(jwt_token);
            console.log(userId);
            auth.login(jwt_token, userId);
            navigate("/forecasts");
        } else if (response.status === 403) {
            setErrors(["Login failed."]);
        } else {
            setErrors(["Unknown error."]);
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-white">Login</h2>
            {errors.map((error, i) => (
                <Error key={i} msg={error} />
            ))}
            <form onSubmit={handleSubmit}>
                <div className="col-md-3 my-3">
                    <label htmlFor="username" className="mb-2">
                        Username:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        onChange={(event) => setUsername(event.target.value)}
                        id="username"
                    />
                </div>
                <div className="col-md-3 my-3">
                    <label htmlFor="password" className="mb-2">
                        Password:
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                        id="password"
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary my-3">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
