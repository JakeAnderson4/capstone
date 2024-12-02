import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("User registered successfully:", data);
        // Redirect to map page after signup
        window.location.href = "/home";
      } else {
        console.error("Error during signup:", data.error);
        alert(data.error || "Signup failed.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="h-100 gradient-form">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="/SOUNDSTAGENOBG.png"
                        style={{ width: "185px" }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">
                        Please sign up for your account
                      </h4>
                    </div>

                    <form onSubmit={handleSignup}>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="signupUsername">
                          Username
                        </label>
                        <input
                          type="text"
                          id="signupUsername"
                          className="form-control"
                          placeholder="Enter Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="signupEmail">
                          Email
                        </label>
                        <input
                          type="email"
                          id="signupEmail"
                          className="form-control"
                          placeholder="Enter Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="signupPassword">
                          Password
                        </label>
                        <input
                          type="password"
                          id="signupPassword"
                          className="form-control"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label
                          className="form-label"
                          htmlFor="signupConfirmPassword"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="signupConfirmPassword"
                          className="form-control"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) =>
                            setConfirmPassword(e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                        >
                          Sign Up
                        </button>
                      </div>
                    </form>
                    <Link to="/" className="btn btn-outline-danger">
                      Login here
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupPage;
