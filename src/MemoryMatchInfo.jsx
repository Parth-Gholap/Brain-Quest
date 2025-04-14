import React from "react";
import "./MemoryMatchInfo.css";

export default function MathMasteryInfo() {
  return (
    <div className="math-mastery-container">
      <div className="container">
        <div className="header">
          <h1 className="title">Math Mastery</h1>
          <a href="/" className="back-button">
            <svg className="home-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Back to Home
          </a>
        </div>

        <div className="content-box">
          <div className="calculator-icon-wrapper">
            <svg className="calculator-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
              <line x1="8" y1="6" x2="16" y2="6"></line>
              <line x1="8" y1="10" x2="16" y2="10"></line>
              <line x1="8" y1="14" x2="16" y2="14"></line>
              <line x1="8" y1="18" x2="16" y2="18"></line>
            </svg>
          </div>

          <h2 className="section-title">Math Mastery Challenge</h2>

          <div className="sections">
            <section>
              <h3 className="section-subtitle">
                <svg className="section-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                Game Overview
              </h3>
              <p className="description">
                Math Mastery is an educational game designed to strengthen mathematical skills across various operations
                and difficulty levels. From basic arithmetic to advanced calculus concepts like integration and
                differentiation, this game offers challenges for learners at all levels.
              </p>
            </section>

            <section>
              <h3 className="section-subtitle">
                <svg className="section-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
                Mathematical Operations
              </h3>
              <div className="grid-container">
                <div className="grid-item">
                  <h4 className="grid-title">Basic Operations</h4>
                  <ul className="item-list">
                    <li>Addition: Practice adding numbers of varying complexity</li>
                    <li>Subtraction: Strengthen subtraction skills with different number ranges</li>
                    <li>Multiplication: Master multiplication with single and multi-digit numbers</li>
                    <li>Division: Practice division problems with and without remainders</li>
                  </ul>
                </div>
                <div className="grid-item">
                  <h4 className="grid-title">Advanced Calculus</h4>
                  <ul className="item-list">
                    <li>Derivatives: Find derivatives of various functions</li>
                    <li>Integration: Calculate definite and indefinite integrals</li>
                    <li>Applications: Apply calculus concepts to real-world problems</li>
                    <li>Limits: Understand and evaluate limits of functions</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="section-subtitle">
                <svg className="section-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                How to Play
              </h3>
              <div className="play-info">
                <div className="grid-item">
                  <h4 className="grid-title">Game Mechanics</h4>
                  <ul className="item-list">
                    <li>Select your preferred difficulty level and operation type</li>
                    <li>Solve math problems before the timer runs out</li>
                    <li>Type your answer or select from multiple choice options for calculus problems</li>
                    <li>Score points based on correct answers, time remaining, and difficulty</li>
                    <li>Advance through levels by maintaining a high score (at least 70%)</li>
                    <li>Higher levels include more challenging problems and calculus concepts</li>
                  </ul>
                </div>

                <div className="grid-item">
                  <h4 className="grid-title">Difficulty Levels</h4>
                  <div className="difficulty-grid">
                    <div className="difficulty-item">
                      <h5 className="difficulty-title">Easy</h5>
                      <p className="difficulty-desc">
                        Simple problems with smaller numbers and 20 seconds per question.
                      </p>
                    </div>
                    <div className="difficulty-item">
                      <h5 className="difficulty-title">Medium</h5>
                      <p className="difficulty-desc">
                        More complex problems with larger numbers and 30 seconds per question.
                      </p>
                    </div>
                    <div className="difficulty-item">
                      <h5 className="difficulty-title">Hard</h5>
                      <p className="difficulty-desc">
                        Advanced problems including calculus concepts with 45 seconds per question.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="section-subtitle">Educational Benefits</h3>
              <ul className="benefits-list">
                <li>Strengthens mental math abilities and calculation speed</li>
                <li>Reinforces understanding of mathematical operations</li>
                <li>Introduces and practices calculus concepts like derivatives and integrals</li>
                <li>Develops problem-solving skills under time constraints</li>
                <li>Provides progressive challenges that grow with the player's abilities</li>
                <li>Makes learning mathematics engaging and rewarding</li>
              </ul>
            </section>

            <div className="button-container">
              <a href="/games/math-ninja" className="play-button">
                Play Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}