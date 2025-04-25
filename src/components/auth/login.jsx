import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { useState } from "react";
import { getEnvWithFallback } from "../../../utils/env";
import { performLogin } from "../../../api/auth";
import { JWT_TOKEN_KEY, setLocalStorageData } from "../../../utils/local_storage";
import { Eye, EyeOff } from "lucide-react"; // Import Eye and EyeOff icons

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (getEnvWithFallback("LNK_ENVIRONMENT") === "stg") {
      navigate("/dashboard", { replace: true });
      return;
    }

    try {
      const response = await performLogin(username, password, isChecked);
      console.log("Response:", response);
      setLocalStorageData(JWT_TOKEN_KEY, response.data.jwt_token);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className="login-container">
        <h1>Login</h1>
        <p>Glad you are back.!</p>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="show-password-button"
                onClick={toggleShowPassword}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="remember-me">
            <input
              type="checkbox"
              id="remember"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="forgot-password">
            <Link to="/signup" className="forgot-link">
              Forgot password?
            </Link>
          </p>
          <p className="signup-text">
            Don’t have an account?{" "}
            <Link to="/signup" className="signup-link">
              Signup
            </Link>
          </p>
        </form>
        <div className="footer-links">
          <a href="#">Terms & Conditions</a>
          <a href="#">Support</a>
          <a href="#">Customer Care</a>
        </div>
      </div>
    </>
  );
};

export default Login;