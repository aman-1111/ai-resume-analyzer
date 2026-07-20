import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://127.0.0.1:8000/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert("🎉 Registration Successful!");

      navigate("/login");
    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(err.response.data.detail);
      } else {
        alert("Backend connection failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <motion.div
        className="auth-container"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Left Side */}

        <div className="left-panel">
          <h1>🤖 Smart ATS</h1>

          <p>
            Join the next-generation AI Resume Analyzer and prepare yourself
            for your dream job with ATS analysis and interview preparation.
          </p>

          <div className="feature">✅ Resume ATS Score</div>

          <div className="feature">✅ AI Resume Suggestions</div>

          <div className="feature">✅ Skill Gap Analysis</div>

          <div className="feature">✅ Interview Questions</div>
        </div>

        {/* Right Side */}

        <div className="right-panel">
          <h2>Create Account 🚀</h2>

          <div className="input-box">
            <FaUser />

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-box">
            <FaEnvelope />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-box">
            <FaLock />

            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="auth-btn"
            onClick={register}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <div className="switch-text">
            Already have an account?

            <Link to="/login"> Login</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;