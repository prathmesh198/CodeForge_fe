import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import anime from "animejs";
import { getProblems } from "../api";
import ProblemCard from "../components/ProblemCard";

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const initial = searchParams.get("search") || "";
    setQuery(initial);
    getProblems().then(data => {
      setProblems(data);
      setTimeout(() => anime({
        targets: ".problem-card",
        opacity: [0, 1],
        translateY: [15, 0],
        delay: anime.stagger(45),
        duration: 500,
        easing: "easeOutQuad"
      }), 50);
    }).catch(() => {});
  }, [searchParams]);

  const filtered = useMemo(() => problems.filter(p => {
    const q = query.toLowerCase();
    const matchesQuery = !q || p.title.toLowerCase().includes(q) || String(p.topic || "").toLowerCase().includes(q);
    const matchesDifficulty = difficulty === "All" || String(p.difficulty).toLowerCase() === difficulty.toLowerCase();
    return matchesQuery && matchesDifficulty;
  }), [problems, query, difficulty]);

  return (
    <main className="section page-top">
      <div className="page-title">
        <div>
          <span className="eyebrow"><Sparkles size={15}/> Practice Arena</span>
          <h1>All Problems</h1>
          <p>100 coding problems to master your DSA skills.</p>
        </div>
        <div className="large-search"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search problems..." /></div>
      </div>

      <div className="problems-layout">
        <aside className="filter-panel glass-panel">
          <h3><SlidersHorizontal size={17}/> Filters</h3>
          <p className="filter-label">Difficulty</p>
          {["All", "Easy", "Medium", "Hard"].map(x =>
            <button key={x} className={difficulty === x ? "filter active" : "filter"} onClick={() => setDifficulty(x)}>
              <span className={`dot ${x.toLowerCase()}`}/>{x}
            </button>
          )}
          <p className="filter-label">Languages</p>
          <span className="language-pill">◉ Java</span>
          <span className="language-pill">◉ Python</span>
          <span className="language-pill">◉ C++</span>
        </aside>

        <section>
          <div className="result-count">{filtered.length} problems found</div>
          <div className="problem-grid">
            {filtered.map(problem => <ProblemCard key={problem.id} problem={problem} />)}
          </div>
          {!filtered.length && <div className="empty glass-panel">No problems found.</div>}
        </section>
      </div>
    </main>
  );
}
