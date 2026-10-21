import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProblemCard({ problem }) {
  const navigate = useNavigate();

  return (
    <button className="problem-card hover-lift" onClick={() => navigate(`/problem/${problem.id}`)}>
      <div className="problem-number">#{problem.id}</div>
      <div className="problem-main">
        <h3>{problem.title}</h3>
        <p>{problem.description || "Practice this coding problem and improve your problem-solving skills."}</p>
        <div className="problem-meta">
          <span>◈ {problem.topic || "DSA"}</span>
          <span>◇ Function</span>
        </div>
      </div>
      <span className={`difficulty ${String(problem.difficulty || "Easy").toLowerCase()}`}>
        {problem.difficulty || "Easy"}
      </span>
      <ArrowRight size={19} className="problem-arrow" />
    </button>
  );
}
