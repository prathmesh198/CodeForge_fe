import { ArrowUpRight } from "lucide-react";

export default function FeatureCard({ icon: Icon, title, text }) {
  return (
    <div className="feature-card hover-lift">
      <div className="feature-icon"><Icon size={21} /></div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <ArrowUpRight className="feature-arrow" size={19} />
    </div>
  );
}
