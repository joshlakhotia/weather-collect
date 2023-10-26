import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password === confirm) {
            const response = await fetch(
                "http://localhost:8080/create_account",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            );

            if (response.status === 201) {
                setSuccess(true);
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } else if (response.status === 403) {
                setErrors(await response.json());
            } else {
                setErrors(await response.json());
            }
        } else {
            setErrors(["Passwords do not match"]);
        }
    };

    return (
        <div className="container mt-5 text-white">
            <h2 className="text-white">Register</h2>
            {success && (
                <div className="alert alert-success">
                    <ul className="mb-0">
                        <li>
                            Registration Successful. You will automatically be
                            brought to the Login page.
                        </li>
                    </ul>
                </div>
            )}
            {errors && errors.length > 0 && (
                <div className="alert alert-danger">
                    <ul className="mb-0">
                        {errors.map((err) => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}
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
                <div className="col-md-3 my-3">
                    <label htmlFor="confirm" className="mb-2">
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm"
                        onChange={(event) => setConfirm(event.target.value)}
                        id="confirm"
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
