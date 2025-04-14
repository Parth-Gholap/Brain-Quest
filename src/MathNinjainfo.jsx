import React from "react";
import { useNavigate } from "react-router-dom";
import "./MathMasteryInfo.css";

function MathMasteryInfo() {
  const navigate = useNavigate();

  return (
    <div className="math-mastery-container">
      <div className="math-mastery-header">
        <h1 className="math-mastery-title">Math Mastery</h1>
        <button 
          onClick={() => navigate('/home')} 
          className="math-mastery-back-button"
        >
          <svg className="math-mastery-home-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Back to Home
        </button>
      </div>

      <div className="math-mastery-content-card">
        <div className="math-mastery-calculator-icon-container">
          <svg className="math-mastery-calculator-icon" viewBox="0 0 24 24" width="80" height="80" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
            <line x1="8" y1="6" x2="16" y2="6"></line>
            <line x1="8" y1="10" x2="8" y2="10"></line>
            <line x1="12" y1="10" x2="12" y2="10"></line>
            <line x1="16" y1="10" x2="16" y2="10"></line>
            <line x1="8" y1="14" x2="8" y2="14"></line>
            <line x1="12" y1="14" x2="12" y2="14"></line>
            <line x1="16" y1="14" x2="16" y2="14"></line>
            <line x1="8" y1="18" x2="8" y2="18"></line>
            <line x1="12" y1="18" x2="12" y2="18"></line>
            <line x1="16" y1="18" x2="16" y2="18"></line>
          </svg>
        </div>

        <h2 className="math-mastery-section-title">Math Mastery Challenge</h2>

        <div className="math-mastery-sections">
          <section className="math-mastery-section">
            <h3 className="math-mastery-subsection-title">
              <svg className="math-mastery-section-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              Game Overview
            </h3>
            <p className="math-mastery-description">
              Math Mastery is an educational game designed to strengthen mathematical skills across various operations
              and difficulty levels. From basic arithmetic to advanced calculus concepts like integration and
              differentiation, this game offers challenges for learners at all levels.
            </p>
          </section>

          <section className="math-mastery-section">
            <h3 className="math-mastery-subsection-title">
              <svg className="math-mastery-section-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
              Mathematical Operations
            </h3>
            <div className="math-mastery-operations-grid">
              <div className="math-mastery-operation-card">
                <h4 className="math-mastery-operation-title">Basic Operations</h4>
                <ul className="math-mastery-feature-list">
                  <li>Addition: Practice adding numbers of varying complexity</li>
                  <li>Subtraction: Strengthen subtraction skills with different number ranges</li>
                  <li>Multiplication: Master multiplication with single and multi-digit numbers</li>
                  <li>Division: Practice division problems with and without remainders</li>
                </ul>
              </div>
              <div className="math-mastery-operation-card">
                <h4 className="math-mastery-operation-title">Advanced Calculus</h4>
                <ul className="math-mastery-feature-list">
                  <li>Derivatives: Find derivatives of various functions</li>
                  <li>Integration: Calculate definite and indefinite integrals</li>
                  <li>Applications: Apply calculus concepts to real-world problems</li>
                  <li>Limits: Understand and evaluate limits of functions</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="math-mastery-section">
            <h3 className="math-mastery-subsection-title">
              <svg className="math-mastery-section-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              How to Play
            </h3>
            <div className="math-mastery-howto-content">
              <div className="math-mastery-howto-card">
                <h4 className="math-mastery-howto-title">Game Mechanics</h4>
                <ul className="math-mastery-feature-list">
                  <li>Select your preferred difficulty level and operation type</li>
                  <li>Solve math problems before the timer runs out</li>
                  <li>Type your answer or select from multiple choice options for calculus problems</li>
                  <li>Score points based on correct answers, time remaining, and difficulty</li>
                  <li>Advance through levels by maintaining a high score (at least 70%)</li>
                  <li>Higher levels include more challenging problems and calculus concepts</li>
                </ul>
              </div>

              <div className="math-mastery-howto-card">
                <h4 className="math-mastery-howto-title">Difficulty Levels</h4>
                <div className="math-mastery-difficulty-grid">
                  <div className="math-mastery-difficulty-card">
                    <h5 className="math-mastery-difficulty-title">Easy</h5>
                    <p className="math-mastery-difficulty-desc">
                      Simple problems with smaller numbers and 20 seconds per question.
                    </p>
                  </div>
                  <div className="math-mastery-difficulty-card">
                    <h5 className="math-mastery-difficulty-title">Medium</h5>
                    <p className="math-mastery-difficulty-desc">
                      More complex problems with larger numbers and 30 seconds per question.
                    </p>
                  </div>
                  <div className="math-mastery-difficulty-card">
                    <h5 className="math-mastery-difficulty-title">Hard</h5>
                    <p className="math-mastery-difficulty-desc">
                      Advanced problems including calculus concepts with 45 seconds per question.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="math-mastery-section">
            <h3 className="math-mastery-subsection-title">Educational Benefits</h3>
            <ul className="math-mastery-benefits-list">
              <li>Strengthens mental math abilities and calculation speed</li>
              <li>Reinforces understanding of mathematical operations</li>
              <li>Introduces and practices calculus concepts like derivatives and integrals</li>
              <li>Develops problem-solving skills under time constraints</li>
              <li>Provides progressive challenges that grow with the player's abilities</li>
              <li>Makes learning mathematics engaging and rewarding</li>
            </ul>
          </section>

          <div className="math-mastery-action-container">
            <button 
              onClick={() => navigate('/math-ninja')} 
              className="math-mastery-play-button"
            >
              Play Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MathMasteryInfo;