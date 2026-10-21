import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Code2, LockKeyhole, Mail, UserRound, ArrowRight } from "lucide-react";
import { registerUser } from "../api";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async e => {
    e.preventDefault();
    setError("");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    try {
      await registerUser(username, email, password);
      navigate("/login");
    } catch (e) { setError(e.message); }
  };

  return (
    <main className="auth-page">
      <div className="auth-decoration"/>
      <div className="auth-brand"><Code2 size={25}/> CodeForge</div>
      <div className="auth-layout">
        <div className="auth-copy">
          <span className="eyebrow">Join CodeForge</span>
          <h1>Create.<br/><span>Learn. Grow.</span></h1>
          <p>Create your account and start building your coding skills with curated DSA problems.</p>
          <div className="auth-points"><span>✓ 100+ coding problems</span><span>✓ Multiple languages</span><span>✓ Track your submissions</span></div>
        </div>
        <form className="auth-card glass-panel" onSubmit={submit}>
          <h2>Create Account</h2><p>Fill in your details to get started.</p>
          <label>Username</label>
          <div className="input-wrap"><UserRound/><input value={username} onChange={e => setUsername(e.target.value)} required placeholder="your username"/></div>
          <label>Email address</label>
          <div className="input-wrap"><Mail/><input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"/></div>
          <label>Password</label>
          <div className="input-wrap"><LockKeyhole/><input type="password" value={password} onChange={e => setPassword(e.target.value)} minLength={6} required placeholder="••••••••"/></div>
          {error && <div className="form-error">{error}</div>}
          <button className="gradient-btn full">Sign Up <ArrowRight size={17}/></button>
          <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </main>
  );
}
