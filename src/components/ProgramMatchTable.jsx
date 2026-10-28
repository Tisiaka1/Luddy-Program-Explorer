import React from "react";
import "./ProgramMatchTable.css";

const tablePrograms = [
  { id: "computer-science", name: "Computer Science", type: "Major" },
  { id: "informatics", name: "Informatics", type: "Major" },
  { id: "artificial-intelligence", name: "Artificial Intelligence", type: "Major" },
  { id: "biomedical-informatics", name: "Biomedical Informatics", type: "Major" },
  { id: "media-arts-science", name: "Media Arts & Science", type: "Major" },
  { id: "cybersecurity", name: "Cybersecurity", type: "Certificate" },
];

const traits = [
  { trait: "Loves mathematics & logical thinking", matches: [true, false, true, false, false, true] },
  { trait: "Interested in people & technology together", matches: [false, true, false, false, false, false] },
  { trait: "Creative with a technical side", matches: [false, true, false, false, true, false] },
  { trait: "Has a healthcare or medical interest", matches: [false, false, false, true, false, false] },
  { trait: "Wants to build with AI & data", matches: [true, false, true, false, false, false] },
  { trait: "Wants to protect systems & information", matches: [true, false, false, false, false, true] },
];

function MatchMark({ isMatch }) {
  return (
    <span className={`match-mark ${isMatch ? "match-mark--yes" : "match-mark--no"}`}>
      <span aria-hidden="true">{isMatch ? "✓" : "–"}</span>
      <span className="sr-only">{isMatch ? "Good match" : "Not a primary match"}</span>
    </span>
  );
}

function ProgramMatchTable() {
  return (
    <section className="fit-section" id="find-your-fit" aria-labelledby="fit-title">
      <div className="page-shell">
        <p className="eyebrow">Advising quick reference</p>
        <h2 id="fit-title">Who Is a Good Fit?</h2>
        <p className="fit-intro">Match your interests, strengths, and goals to a program. Select a program name to jump to its details.</p>

        <div className="table-scroll" tabIndex="0" role="region" aria-label="Program fit comparison table">
          <table className="match-table">
            <caption className="sr-only">How six Luddy programs align with common student interests</caption>
            <thead>
              <tr>
                <th className="profile-heading" scope="col">Student profile</th>
                {tablePrograms.map((program) => (
                  <th scope="col" key={program.id}>
                    <a href={`#${program.id}`}>{program.name}</a>
                    <span className={`table-type table-type--${program.type.toLowerCase()}`}>{program.type}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {traits.map((row) => (
                <tr key={row.trait}>
                  <th scope="row">{row.trait}</th>
                  {row.matches.map((isMatch, index) => (
                    <td key={tablePrograms[index].id}><MatchMark isMatch={isMatch} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ProgramMatchTable;
