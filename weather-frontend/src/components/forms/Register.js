import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Error from "../pages/Error";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:8080/create_account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (response.status === 201) {
            navigate("/login");
        } else if (response.status === 403) {
            setErrors(["Registration failed."]);
        } else {
            setErrors(["Unknown error."]);
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-white">Register</h2>
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
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
