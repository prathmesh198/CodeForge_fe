import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserRound, CheckCircle2, Send, Flame, Github, Linkedin, LogOut } from "lucide-react";
import { getProfile } from "../api";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) return navigate("/login");
    getProfile().then(setProfile).catch(e => {
      setError(e.message);
      if (e.message.toLowerCase().includes("token")) navigate("/login");
    });
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (error) return <main className="center-page section"><div className="glass-panel empty"><h2>{error}</h2><Link className="gradient-btn" to="/login">Login Again</Link></div></main>;
  if (!profile) return <div className="loading-screen">Loading profile...</div>;

  return (
    <main className="section page-top">
      <div className="profile-header glass-panel">
        <div className="profile-avatar"><UserRound size={45}/></div>
        <div className="profile-info">
          <h1>{profile.user?.username}</h1>
          <p>{profile.user?.email}</p>
          <span className="beginner-badge">◆ Beginner</span>
        </div>
        <div className="profile-stats">
          <div><CheckCircle2/><b>{profile.stats?.solved ?? 0}</b><span>Solved</span></div>
          <div><Send/><b>{profile.stats?.submissions ?? 0}</b><span>Submissions</span></div>
          <div><Flame/><b>5</b><span>Day Streak</span></div>
        </div>
        <button className="icon-btn" onClick={logout}><LogOut size={18}/></button>
      </div>

      <div className="profile-grid">
        <section className="glass-panel">
          <div className="section-heading"><div><span className="eyebrow">Progress</span><h2>Solved Problems</h2></div></div>
          <div className="solved-grid">
            {(profile.solved_problems || []).map(p => (
              <Link className="solved-card hover-lift" to={`/problem/${p.problem_id}`} key={p.problem_id}>
                <span>{p.problem_id}</span><div><b>{p.problem_title}</b><small>✓ Accepted</small></div>
              </Link>
            ))}
          </div>
          {!profile.solved_problems?.length && <div className="empty">Solve your first problem to see it here.</div>}
        </section>

        <aside className="glass-panel profile-side">
          <h3>Keep Going! 🚀</h3>
          <p>Consistency is the key to becoming a great developer.</p>
          <Link className="gradient-btn" to="/problems">Practice Now</Link>
          <div className="socials"><Github/><Linkedin/></div>
        </aside>
      </div>
    </main>
  );
}
