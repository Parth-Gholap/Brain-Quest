
// AttackSimulatorInfo.jsx
import React from "react";
import { Home, Shield, Clock, AlertTriangle, BookOpen } from "lucide-react";
import "./AttackSimulatorInfo.css";

export default function AttackSimulatorInfo() {
  return (
    <div className="simulator-background">
      <div className="container">
        <div className="header">
          <h1 className="main-title">Attack Simulator</h1>
          <a href="/" className="home-button">
            <Home className="icon-small" />
            Back to Home
          </a>
        </div>

        <div className="info-card">
          <div className="shield-container">
            <Shield className="shield-icon" />
          </div>

          <h2 className="card-title">Attack Simulator Challenge</h2>

          <div className="content-wrapper">
            <section>
              <h3 className="section-title">
                <AlertTriangle className="section-icon" />
                Game Overview
              </h3>
              <p className="section-text">
                Attack Simulator is an educational cybersecurity game designed to test and improve your ability to
                respond to various cyber threats. From phishing emails to ransomware attacks, this game challenges you
                to make quick, informed decisions when faced with common security scenarios that occur in real-world
                environments.
              </p>
            </section>

            <section>
              <h3 className="section-title">
                <Clock className="section-icon" />
                How to Play
              </h3>
              <div className="feature-grid">
                <div className="feature-box">
                  <h4 className="feature-title">Game Mechanics</h4>
                  <ul className="feature-list">
                    <li>You'll be presented with 10 different cybersecurity attack scenarios</li>
                    <li>For each scenario, you must choose the correct response from multiple options</li>
                    <li>You have 10 seconds to make your decision for each scenario</li>
                    <li>Earn 20 points for each correct response</li>
                    <li>After each response, you'll receive feedback and an explanation</li>
                    <li>Complete all scenarios to finish the game and see your final score</li>
                  </ul>
                </div>

                <div className="feature-box">
                  <h4 className="feature-title">Challenge Types</h4>
                  <div className="challenge-grid">
                    <div className="challenge-box">
                      <h5 className="challenge-title">Social Engineering</h5>
                      <p className="challenge-text">
                        Scenarios involving phishing emails, suspicious calls, and impersonation attempts.
                      </p>
                    </div>
                    <div className="challenge-box">
                      <h5 className="challenge-title">Malware Threats</h5>
                      <p className="challenge-text">
                        Situations with ransomware, suspicious downloads, and malicious links.
                      </p>
                    </div>
                    <div className="challenge-box">
                      <h5 className="challenge-title">Physical Security</h5>
                      <p className="challenge-text">
                        Challenges related to tailgating, shoulder surfing, and unauthorized physical access.
                      </p>
                    </div>
                    <div className="challenge-box">
                      <h5 className="challenge-title">Account Security</h5>
                      <p className="challenge-text">
                        Scenarios about password management, suspicious logins, and account protection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="section-title">
                <BookOpen className="section-icon" />
                Sample Scenarios
              </h3>
              <div className="scenario-container">
                <div className="scenario-box">
                  <h4 className="scenario-title">Phishing Email</h4>
                  <p className="scenario-text">
                    "You receive an email from 'support@bank-secure.com' asking you to verify your account details."
                  </p>
                  <p className="scenario-text scenario-options">
                    <span className="text-bold">Options:</span> Click the link, Ignore the email, Reply with account
                    details, Report as phishing
                  </p>
                </div>

                <div className="scenario-box">
                  <h4 className="scenario-title">Ransomware Infection</h4>
                  <p className="scenario-text">
                    "Your computer displays a message demanding payment to unlock your files."
                  </p>
                  <p className="scenario-text scenario-options">
                    <span className="text-bold">Options:</span> Pay the ransom, Run antivirus, Shut down your
                    computer, Call IT support
                  </p>
                </div>

                <div className="scenario-box">
                  <h4 className="scenario-title">USB Drive Attack</h4>
                  <p className="scenario-text">
                    "You find an unmarked USB drive on your desk. What should you do?"
                  </p>
                  <p className="scenario-text scenario-options">
                    <span className="text-bold">Options:</span> Plug it in to check the contents, Ignore it, Give it
                    to IT for analysis, Throw it away
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="section-title">Educational Benefits</h3>
              <ul className="benefits-list">
                <li>Improves awareness of common cybersecurity threats and attack vectors</li>
                <li>Teaches appropriate responses to various security incidents</li>
                <li>Develops quick decision-making skills in security-critical situations</li>
                <li>Provides practical knowledge that can be applied in real-world scenarios</li>
                <li>Reinforces best practices for personal and organizational security</li>
                <li>Builds confidence in identifying and responding to cyber threats</li>
              </ul>
            </section>

            <div className="cta-container">
              <a href="/games/attack-simulator" className="play-button">
                Play Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

