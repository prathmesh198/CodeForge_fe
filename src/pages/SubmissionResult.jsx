import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle2, Trophy, Clock3, Database, ArrowRight } from "lucide-react";
import anime from "animejs";

export default function SubmissionResult() {
  const location = useLocation();
  const result = location.state?.result;

  useEffect(() => {
    anime({targets: ".success-card", scale: [0.94, 1], opacity: [0, 1], duration: 700, easing: "easeOutExpo"});
    anime({targets: ".confetti", translateY: [-30, 30], rotate: [-10, 10], direction: "alternate", loop: true, duration: 1400, delay: anime.stagger(100), easing: "easeInOutSine"});
  }, []);

  return (
    <main className="center-page section">
      <div className="success-card glass-panel">
        <div className="confetti-row"><span className="confetti">✦</span><span className="confetti">◆</span><span className="confetti">✦</span></div>
        <div className="trophy"><Trophy size={42}/></div>
        <h1>All Tests Passed!</h1>
        <p>Great job! Your solution is correct.</p>

        <div className="metrics large">
          <div><CheckCircle2/><b>{result?.passed_tests ?? "2/2"}</b><span>Tests Passed</span></div>
          <div><Clock3/><b>{result?.runtime_ms ?? "0.053"} ms</b><span>Runtime</span></div>
          <div><Database/><b>{result?.memory_kb ?? "16304"} KB</b><span>Memory</span></div>
        </div>

        <div className="success-actions">
          <Link className="gradient-btn" to="/problems">Try Another Problem <ArrowRight size={17}/></Link>
          <Link className="outline-btn" to="/profile">View Profile</Link>
        </div>
      </div>
    </main>
  );
}
