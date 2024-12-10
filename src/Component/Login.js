
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'

function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Username:", userName);
        console.log("Password:", password);

        try {
            const data = new FormData();
            data.append("userName", userName);
            data.append("password", password);

            // Change to your API endpoint
            const response = await fetch(
                "http://mvnpl.saturnxdigital.com/motorlogbook/login.php",
                {
                    method: "POST",
                    body: data,
                }
            );

            const result = await response.json();
            console.log(result);

            if (result.status === "success") {
                // Navigate based on the user role
                if (userName === "CHP@admin.co") {
                    nav("/addrecord");
                }
                else if (userName === "Store@admin.co") {
                    nav("/logbook");
                } else {
                    nav("/");
                }
            } else {
                alert("Login failed: " + result.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred while trying to log in. Please try again later.");
        }
    };

    return (



        <section  >
            <div className="back-btn ">
                <a href="/">
                    <button >Back</button>
                </a>
                
            </div>

            <div className="gradient-form">
                <div className="text-center mb-4">
                    <h4 className="mt-2 mb-2">LOGIN</h4>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Username Field */}
                    <div className="form-outline mb-4 d-flex align-items-center">
                        <label className="form-label mr-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your userName"
                            className="form-control flex-grow-1"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="form-outline mb-4 d-flex align-items-center">
                        <label className="form-label mr-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="form-control flex-grow-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Login Button */}
                    <div className="text-center">
                        <button className="btn btn-primary btn-block" type="submit">
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </section>

    );
}

export default Login;

