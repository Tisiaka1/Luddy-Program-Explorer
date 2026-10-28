import React, { useState } from "react";
import "./GoodToKnow.css";

const faqData = [
  {
    id: "degree-difference",
    question: "B.S. or B.A. in Computer Science—what’s the difference?",
    content: (
      <>
        <p>Employment options are identical for both degrees.</p>
        <p><strong>B.A.</strong> coursework incorporates world languages and writing, with room for a specialized major focus.</p>
        <p><strong>B.S.</strong> coursework includes calculus to prepare you for advanced study in fields such as deep learning and data science.</p>
      </>
    ),
  },
  {
    id: "online-study",
    question: "Can I study online?",
    content: <p>Several programs offer online study. Check each program’s current delivery options with Luddy Indianapolis before enrolling.</p>,
  },
  {
    id: "accelerated-masters",
    question: "Can I get a master’s degree faster?",
    content: <p>Eligible students can explore accelerated pathways that combine bachelor’s and master’s coursework in as little as five years.</p>,
  },
  {
    id: "premed-path",
    question: "I’m premed. Is there a path for me?",
    content: <p>Biomedical Informatics includes a premedical pathway that combines computing, life sciences, and preparation for further health study.</p>,
  },
  {
    id: "shorter-credentials",
    question: "Not ready to commit to a full degree?",
    content: <p>Minors and undergraduate certificates let you build focused skills or complement another major without starting a second full degree.</p>,
  },
  {
    id: "student-life",
    question: "What’s student life like?",
    content: <p>Project teams, student organizations, portfolio work, internships, and Indianapolis industry connections all extend learning beyond the classroom.</p>,
  },
];

function GoodToKnow() {
  const [openId, setOpenId] = useState(faqData[0].id);

  return (
    <section className="faq-section" id="good-to-know" aria-labelledby="faq-title">
      <div className="page-shell faq-shell">
        <p className="eyebrow">Plan with confidence</p>
        <h2 id="faq-title">Good to Know</h2>

        <div className="faq-list">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <article className="faq-item" key={item.id}>
                <h3>
                  <button
                    type="button"
                    id={`${item.id}-button`}
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-panel`}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                  >
                    <span>{item.question}</span>
                    <span className={`faq-icon ${isOpen ? "is-open" : ""}`} aria-hidden="true">+</span>
                  </button>
                </h3>
                {isOpen && (
                  <div
                    className="faq-panel"
                    id={`${item.id}-panel`}
                    role="region"
                    aria-labelledby={`${item.id}-button`}
                  >
                    {item.content}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default GoodToKnow;
