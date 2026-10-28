import React, { useMemo, useState } from "react";
import { programCounts, programs } from "../data/programs";

const filters = ["All", "Major", "Minor", "Certificate"];

function ProgramMeta({ program }) {
  return (
    <div className="program-meta">
      <span className="type-pill">{program.type}</span>
      {program.option && <span className="option-pill">{program.option}</span>}
      {program.credits && <span className="credit-label">{program.credits} credits</span>}
    </div>
  );
}

function ProgramSummary({ program }) {
  return (
    <>
      <span className="program-symbol" aria-hidden="true">{program.symbol}</span>
      <span className="program-summary-copy">
        <ProgramMeta program={program} />
        <span className="program-name">{program.name}</span>
        <span className="program-degree">{program.degree}</span>
        <span className="program-description">{program.description}</span>
      </span>
    </>
  );
}

function MajorDetails({ program }) {
  return (
    <div
      className="program-details"
      id={`${program.id}-details`}
      aria-labelledby={`${program.id}-toggle`}
      role="region"
    >
      <div>
        <p className="detail-label">What you’ll study</p>
        <ul className="tag-list" aria-label={`Topics in ${program.name}`}>
          {program.study.map((topic) => <li key={topic}>{topic}</li>)}
        </ul>
        <p className="recommendation"><strong>Good fit:</strong> {program.recommendation}</p>
      </div>
      <div>
        <p className="detail-label">Career directions</p>
        <ul className="tag-list tag-list--outline" aria-label={`Careers related to ${program.name}`}>
          {program.careers.map((career) => <li key={career}>{career}</li>)}
        </ul>
        <p className="program-format">{program.format}</p>
      </div>
    </div>
  );
}

function ProgramCard({ program, isOpen, onToggle }) {
  const typeClass = program.type.toLowerCase();
  const isExpandable = program.type === "Major";

  return (
    <article className={`program-card program-card--${typeClass}`} id={program.id}>
      {isExpandable ? (
        <>
          <button
            className="program-toggle"
            id={`${program.id}-toggle`}
            type="button"
            aria-expanded={isOpen}
            aria-controls={`${program.id}-details`}
            onClick={onToggle}
          >
            <ProgramSummary program={program} />
            <span className={`program-chevron ${isOpen ? "is-open" : ""}`} aria-hidden="true">⌄</span>
          </button>
          {isOpen && <MajorDetails program={program} />}
        </>
      ) : (
        <div className="program-static-summary">
          <ProgramSummary program={program} />
        </div>
      )}
    </article>
  );
}

function ProgramExplorer() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [openProgram, setOpenProgram] = useState("artificial-intelligence");

  const visiblePrograms = useMemo(
    () => activeFilter === "All" ? programs : programs.filter((program) => program.type === activeFilter),
    [activeFilter],
  );

  const setFilter = (filter) => {
    setActiveFilter(filter);
    if (filter !== "All" && filter !== "Major") setOpenProgram(null);
  };

  return (
    <section className="programs-section" id="programs" aria-labelledby="programs-title">
      <div className="page-shell">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Explore every path</p>
            <h2 id="programs-title">Luddy Programs</h2>
            <p>Tap a major to see what you’ll study, possible career directions, and why it may fit.</p>
          </div>

          <div className="filter-buttons" aria-label="Filter programs">
            {filters.map((filter) => (
              <button
                className={activeFilter === filter ? "is-active" : ""}
                type="button"
                aria-pressed={activeFilter === filter}
                key={filter}
                onClick={() => setFilter(filter)}
              >
                {filter === "All" ? "All Programs" : `${filter}s`} · {programCounts[filter]}
              </button>
            ))}
          </div>
        </div>

        <div className="program-list" aria-live="polite">
          {visiblePrograms.map((program) => (
            <ProgramCard
              program={program}
              isOpen={openProgram === program.id}
              key={program.id}
              onToggle={() => setOpenProgram(openProgram === program.id ? null : program.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProgramExplorer;
