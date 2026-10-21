import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Code2, LockKeyhole, Mail, ArrowRight } from "lucide-react";
import anime from "animejs";
import { loginUser } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async e => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      anime({targets: ".auth-card", scale: [1, 1.03, 1], duration: 350});
      setTimeout(() => navigate("/"), 250);
    } catch (e) { setError(e.message); }
  };

  return (
    <main className="auth-page">
      <div className="auth-decoration"/>
      <div className="auth-brand"><Code2 size={25}/> CodeForge</div>
      <div className="auth-layout">
        <div className="auth-copy">
          <span className="eyebrow">Welcome back</span>
          <h1>Keep building.<br/><span>Keep growing.</span></h1>
          <p>Sign in to continue your coding journey, track your progress and solve new challenges.</p>
          <div className="auth-points"><span>✓ Solve real problems</span><span>✓ Track your progress</span><span>✓ Build your developer profile</span></div>
        </div>
        <form className="auth-card glass-panel" onSubmit={submit}>
          <h2>Login</h2><p>Enter your account details.</p>
          <label>Email address</label>
          <div className="input-wrap"><Mail/><input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"/></div>
          <label>Password</label>
          <div className="input-wrap"><LockKeyhole/><input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"/></div>
          {error && <div className="form-error">{error}</div>}
          <button className="gradient-btn full">Login <ArrowRight size={17}/></button>
          <p className="auth-switch">Don't have an account? <Link to="/register">Sign up</Link></p>
        </form>
      </div>
    </main>
  );
}
