import React from "react";
import { Code, Home, Terminal, Cpu, BookOpen } from "lucide-react";
import './CodeBreakerInfo.css';

export default function CodeBreakerInfo() {
  return (
    <div className="code-breaker-container">
      <div className="container">
        <div className="header">
          <h1 className="title">Code Breaker</h1>
          <a href="/" className="back-button">
            <Home className="icon-small" />
            Back to Home
          </a>
        </div>

        <div className="content-card">
          <div className="icon-container">
            <Code className="icon-large icon-purple" />
          </div>

          <h2 className="section-title">Code Breaker Challenge</h2>

          <div className="sections">
            <section>
              <h3 className="subsection-title">
                <Terminal className="icon-small icon-purple" />
                Game Overview
              </h3>
              <p className="text-content">
                Code Breaker is an educational game designed to teach and reinforce computer science concepts through
                engaging challenges. Test your knowledge of programming syntax, concepts, debugging skills, and
                algorithms while learning new ideas along the way.
              </p>
            </section>

            <section>
              <h3 className="subsection-title">
                <Cpu className="icon-small icon-purple" />
                Challenge Categories
              </h3>
              <div className="category-grid">
                <div className="category-card">
                  <h4 className="card-title">Syntax</h4>
                  <p className="card-text">
                    Test your knowledge of programming language syntax, including variable declarations, function
                    definitions, loops, and more. Perfect for reinforcing coding fundamentals.
                  </p>
                </div>
                <div className="category-card">
                  <h4 className="card-title">Programming Concepts</h4>
                  <p className="card-text">
                    Explore core computer science concepts like object-oriented programming, data structures, recursion,
                    and asynchronous programming.
                  </p>
                </div>
                <div className="category-card">
                  <h4 className="card-title">Debugging</h4>
                  <p className="card-text">
                    Sharpen your debugging skills by identifying and fixing errors in code snippets. Learn to spot
                    common bugs and understand why they occur.
                  </p>
                </div>
                <div className="category-card">
                  <h4 className="card-title">Algorithms</h4>
                  <p className="card-text">
                    Challenge yourself with questions about algorithm complexity, sorting methods, search techniques,
                    and other fundamental algorithms used in computer science.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="subsection-title">
                <BookOpen className="icon-small icon-purple" />
                How to Play
              </h3>
              <div className="instruction-cards">
                <div className="instruction-card">
                  <h4 className="card-title">Game Mechanics</h4>
                  <ul className="bullet-list">
                    <li>Select a challenge category and difficulty level</li>
                    <li>Read each challenge carefully</li>
                    <li>Select the correct answer before the timer runs out</li>
                    <li>Learn from detailed explanations after each question</li>
                    <li>Complete all challenges to finish the game</li>
                  </ul>
                </div>

                <div className="instruction-card">
                  <h4 className="card-title">Difficulty Levels</h4>
                  <div className="difficulty-grid">
                    <div className="difficulty-card">
                      <h5 className="difficulty-title">Easy</h5>
                      <p className="card-text">
                        Beginner-friendly questions covering fundamental concepts with 30 seconds per question.
                      </p>
                    </div>
                    <div className="difficulty-card">
                      <h5 className="difficulty-title">Medium</h5>
                      <p className="card-text">
                        Intermediate challenges requiring deeper understanding with 45 seconds per question.
                      </p>
                    </div>
                    <div className="difficulty-card">
                      <h5 className="difficulty-title">Hard</h5>
                      <p className="card-text">
                        Advanced problems that test comprehensive knowledge with 60 seconds per question.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="subsection-title">Educational Benefits</h3>
              <ul className="benefits-list">
                <li>Reinforces programming syntax and computer science concepts</li>
                <li>Develops debugging skills and problem-solving abilities</li>
                <li>Introduces algorithm analysis and complexity considerations</li>
                <li>Provides immediate feedback and detailed explanations</li>
                <li>Makes learning computer science engaging and interactive</li>
                <li>Prepares students for programming interviews and assessments</li>
              </ul>
            </section>

            <div className="button-container">
              <a href="/games/code-breaker" className="play-button">
                Play Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}