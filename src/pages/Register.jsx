import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Code2,
  LockKeyhole,
  Mail,
  UserRound,
  ArrowRight
} from "lucide-react";

import { registerUser } from "../api";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    setError("");

    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (!username.trim()) {
      setError("Username is required.");
      return;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    setLoading(true);

    try {
      console.log("================================");
      console.log("REGISTER START");
      console.log("USERNAME:", username);
      console.log("EMAIL:", email);
      console.log("================================");

      const data = await registerUser(
        username.trim(),
        email.trim(),
        password
      );

      console.log(
        "REGISTER SUCCESS:",
        data
      );

      alert(
        "Registration successful! Please login."
      );

      navigate("/login");

    } catch (error) {

      console.error(
        "REGISTER ERROR:",
        error
      );

      console.error(
        "REGISTER ERROR MESSAGE:",
        error.message
      );

      setError(
        error.message ||
        "Registration failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">

      <div className="auth-decoration" />

      {/* BRAND */}

      <div className="auth-brand">
        <Code2 size={25} />
        CodeForge
      </div>

      <div className="auth-layout">

        {/* LEFT SIDE */}

        <div className="auth-copy">

          <span className="eyebrow">
            Join CodeForge
          </span>

          <h1>
            Create.
            <br />
            <span>Learn. Grow.</span>
          </h1>

          <p>
            Create your account and start building
            your coding skills with curated DSA
            problems.
          </p>

          <div className="auth-points">

            <span>
              ✓ 100+ coding problems
            </span>

            <span>
              ✓ Multiple languages
            </span>

            <span>
              ✓ Track your submissions
            </span>

          </div>

        </div>

        {/* REGISTER FORM */}

        <form
          className="auth-card glass-panel"
          onSubmit={submit}
        >

          <h2>
            Create Account
          </h2>

          <p>
            Fill in your details to get started.
          </p>

          {/* USERNAME */}

          <label>
            Username
          </label>

          <div className="input-wrap">

            <UserRound size={18} />

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              required
              placeholder="your username"
              autoComplete="username"
            />

          </div>

          {/* EMAIL */}

          <label>
            Email address
          </label>

          <div className="input-wrap">

            <Mail size={18} />

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              placeholder="you@example.com"
              autoComplete="email"
            />

          </div>

          {/* PASSWORD */}

          <label>
            Password
          </label>

          <div className="input-wrap">

            <LockKeyhole size={18} />

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              minLength={6}
              required
              placeholder="••••••••"
              autoComplete="new-password"
            />

          </div>

          {/* ERROR */}

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          {/* BUTTON */}

          <button
            type="submit"
            className="gradient-btn full"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Sign Up"
            }

            {!loading && (
              <ArrowRight size={17} />
            )}

          </button>

          {/* LOGIN */}

          <p className="auth-switch">

            Already have an account?

            {" "}

            <Link to="/login">
              Login
            </Link>

          </p>

        </form>

      </div>

    </main>
  );
}