import React from "react";
import "./App.css";
import AskAI from "./components/AskAI";
import Footer from "./components/Footer";
import GoodToKnow from "./components/GoodToKnow";
import ProgramExplorer from "./components/ProgramExplorer";
import ProgramMatchTable from "./components/ProgramMatchTable";

const stats = [
  {
    className: "stat-card--major",
    shortLabel: "M",
    value: "8",
    label: "Majors",
    note: "Artificial Intelligence to Media Arts",
  },
  {
    className: "stat-card--minor",
    shortLabel: "Mi",
    value: "3",
    label: "Minors",
    note: "CS, studio arts, video production",
  },
  {
    className: "stat-card--certificate",
    shortLabel: "C",
    value: "11",
    label: "Certificates",
    note: "Cybersecurity to virtual production",
  },
  {
    className: "stat-card--accelerated",
    shortLabel: "5",
    value: "5 yrs",
    label: "B.S. + M.S.",
    note: "Accelerated master’s pathways",
  },
];

function Header() {
  return (
    <header className="site-header">
      <div className="page-shell nav-inner">
        <a className="brand" href="#top" aria-label="Luddy Program Explorer home">
          <span className="brand-mark" aria-hidden="true">L</span>
          <span><strong>Luddy</strong> Program Explorer</span>
        </a>

        <nav aria-label="Primary navigation">
          <ul className="nav-links">
            <li><a href="#programs">Programs</a></li>
            <li><a href="#find-your-fit">Find Your Fit</a></li>
            <li><a href="#good-to-know">Good to Know</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="page-shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Luddy Indianapolis</p>
          <h1>
            Find the Right <span>Luddy Program</span> for Each Student.
          </h1>
          <p className="hero-intro">
            A clear, student-friendly guide to majors, minors, and certificates at Luddy Indianapolis.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="#programs">Explore Programs</a>
            <a className="button button--secondary" href="#find-your-fit">Compare Your Fit</a>
          </div>
        </div>

        <div className="stats-grid" aria-label="Program overview">
          {stats.map((stat) => (
            <article className={`stat-card ${stat.className}`} key={stat.label}>
              <span className="stat-badge" aria-hidden="true">{stat.shortLabel}</span>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-note">{stat.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <ProgramExplorer />
        <ProgramMatchTable />
        <GoodToKnow />
      </main>
      <Footer />
      <AskAI />
    </>
  );
}

export default App;
