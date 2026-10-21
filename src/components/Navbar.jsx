import { Link, NavLink, useNavigate } from "react-router-dom";
import { Code2, Search, Bell, UserRound, LogOut } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/problems?search=${encodeURIComponent(search)}`);
  };

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <span className="brand-icon"><Code2 size={23} /></span>
        <span>CodeForge</span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/problems">Problems</NavLink>
        
        <Link to="/roadmap">Roadmap</Link>
        {user && <NavLink to="/profile">Profile</NavLink>}
      </nav>

      <form className="search-box" onSubmit={submitSearch}>
        <Search size={17} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search problems..."
        />
      </form>

      <div className="nav-actions">
        <button className="icon-btn"><Bell size={18} /></button>
        {user ? (
          <>
            <Link className="user-chip" to="/profile">
              <span className="avatar"><UserRound size={17} /></span>
              <span>{user.username}</span>
            </Link>
            <button className="icon-btn" onClick={logout} title="Logout">
              <LogOut size={17} />
            </button>
          </>
        ) : (
          <>
            <Link className="nav-login" to="/login">Login</Link>
            <Link className="gradient-btn small" to="/register">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
}
