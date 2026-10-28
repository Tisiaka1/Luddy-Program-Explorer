import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-main">
        <div>
          <h2>Still deciding?</h2>
          <p>Explore the program list, compare your interests, or connect with Luddy Indianapolis.</p>
        </div>
        <a className="footer-cta" href="https://luddy.indianapolis.iu.edu/" target="_blank" rel="noreferrer">
          Visit Luddy Indianapolis
        </a>
      </div>
      <div className="footer-bottom-border">
        <div className="page-shell footer-bottom">
          <p>
            Student-made guide—not an official IU site. Verify details at{" "}
            <a href="https://luddy.indianapolis.iu.edu/" target="_blank" rel="noreferrer">luddy.indianapolis.iu.edu</a>
          </p>
          <p>Luddy Program Explorer · IU Indianapolis</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
