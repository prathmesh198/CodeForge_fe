import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Trophy, BarChart3, Zap, Terminal, Target, Sparkles } from "lucide-react";
import anime from "animejs";
import { getProblems } from "../api";
import FeatureCard from "../components/FeatureCard";
import ProblemCard from "../components/ProblemCard";

export default function Home() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    getProblems().then(setProblems).catch(() => {});
    anime({
      targets: ".hero-content > *",
      translateY: [30, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 800,
      easing: "easeOutExpo"
    });
    anime({
      targets: ".floating-code",
      translateY: [-12, 12],
      direction: "alternate",
      loop: true,
      duration: 2200,
      easing: "easeInOutSine"
    });
    anime({
      targets: ".orb",
      scale: [0.92, 1.08],
      opacity: [0.45, 0.8],
      direction: "alternate",
      loop: true,
      duration: 3000,
      easing: "easeInOutSine"
    });
  }, []);

  return (
    <main>
      <section className="hero section">
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="hero-content">
          <span className="eyebrow"><Sparkles size={15}/> Code. Learn. Grow.</span>
          <h1>Sharpen Your Skills<br />Build <span>Your Future</span></h1>
          <p>
            Practice coding, solve real problems, and become a better developer
            with CodeForge. Your journey to greatness starts here.
          </p>
          <div className="hero-buttons">
            <Link className="gradient-btn" to="/problems">Start Practicing <ArrowRight size={18}/></Link>
            <Link className="outline-btn" to="/problems">Explore Problems</Link>
          </div>
          <div className="hero-stats">
            <div><strong>100+</strong><span>Problems</span></div>
            <div><strong>3</strong><span>Languages</span></div>
            <div><strong>10K+</strong><span>Developers</span></div>
            <div><strong>100%</strong><span>Free</span></div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="code-orbit orbit-a">Java</div>
          <div className="code-orbit orbit-b">Python</div>
          <div className="code-orbit orbit-c">C++</div>
          <div className="floating-code">
            <div className="code-window">
              <div className="window-top"><i/><i/><i/></div>
              <pre>{`class Solution {
  public int solve(int[] nums) {
    int answer = 0;

    for (int x : nums) {
      answer += x;
    }

    return answer;
  }
}`}</pre>
            </div>
            <div className="hero-terminal">
              <Terminal size={18}/>
              <span>CodeForge Online Judge</span>
              <b>✓ Ready</b>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="feature-grid">
          <FeatureCard icon={Zap} title="Solve Problems" text="Practice curated problems from basic to advanced." />
          <FeatureCard icon={Code2} title="Write Code" text="Use our powerful online editor with multiple languages." />
          <FeatureCard icon={BarChart3} title="Track Progress" text="Monitor your performance and improve over time." />
          <FeatureCard icon={Trophy} title="Achieve Goals" text="Get better, solve more and become a top developer." />
        </div>
      </section>

      <section className="section two-column">
        <div className="glass-panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Featured</span>
              <h2>Featured Problems</h2>
            </div>
            <Link to="/problems">View All <ArrowRight size={16}/></Link>
          </div>
          <div className="problem-list">
            {problems.slice(0, 4).map(p => <ProblemCard key={p.id} problem={p} />)}
          </div>
        </div>

        <div className="side-stack">
          <div className="editor-preview glass-panel">
            <div className="editor-tabs">
              <span className="active">Java</span><span>Python</span><span>C++</span>
            </div>
            <pre>{`public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE;
    int maxProfit = 0;

    for (int price : prices) {
        if (price < minPrice)
            minPrice = price;
        else
            maxProfit = Math.max(
                maxProfit, price - minPrice
            );
    }

    return maxProfit;
}`}</pre>
            <Link className="run-mini" to="/problem/2"><Target size={15}/> Run</Link>
          </div>

          <div className="profile-mini glass-panel">
            <div className="big-avatar"><Code2 size={25}/></div>
            <div><strong>{JSON.parse(localStorage.getItem("user") || "null")?.username || "Developer"}</strong><span>Beginner</span></div>
            <div className="mini-stat"><b>12</b><span>Solved</span></div>
            <div className="mini-stat"><b>48</b><span>Submissions</span></div>
            <div className="mini-stat"><b>5</b><span>Day Streak</span></div>
          </div>
        </div>
      </section>
    </main>
  );
}
