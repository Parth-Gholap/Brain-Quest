import "./RiddlesInfo.css";
import React from "react";


// Note: Replace these with your own icon components or import from a library like react-icons
const Lightbulb = () => <div className="icon lightbulb-icon"></div>;
const Home = () => <div className="icon home-icon"></div>;
const Brain = () => <div className="icon brain-icon"></div>;
const Clock = () => <div className="icon clock-icon"></div>;
const Award = () => <div className="icon award-icon"></div>;

export default function RiddlesInfo() {
  return (
    <div className="riddles-container">
      <div className="container">
        <div className="header">
          <h1 className="title">Brain Teasers</h1>
          <a href="/" className="back-button">
            <span className="home-icon"></span>
            Back to Home
          </a>
        </div>

        <div className="content-box">
          <div className="icon-container">
            <Lightbulb />
          </div>

          <h2 className="page-title">Brain Teasers Challenge</h2>

          <div className="sections">
            <section>
              <h3 className="section-title">
                <Brain />
                Game Overview
              </h3>
              <p className="section-text">
                Brain Teasers is an engaging puzzle game that challenges your critical thinking and problem-solving
                skills. Solve a variety of riddles and brain teasers that will make you think outside the box and
                exercise your mental agility.
              </p>
            </section>

            <section>
              <h3 className="section-title">
                <Clock />
                How to Play
              </h3>
              <div className="subsections">
                <div className="info-box">
                  <h4 className="info-title">Game Mechanics</h4>
                  <ul className="info-list">
                    <li>Read each riddle carefully</li>
                    <li>Type your answer before the timer runs out</li>
                    <li>Use hints if you're stuck (but try without first!)</li>
                    <li>Score points for each correct answer</li>
                    <li>Complete all riddles to finish the game</li>
                  </ul>
                </div>

                <div className="info-box">
                  <h4 className="info-title">Difficulty Levels</h4>
                  <p className="info-text">
                    Riddles come in three difficulty levels, each with its own time limit:
                  </p>
                  <div className="difficulty-grid">
                    <div className="difficulty easy">
                      <div className="difficulty-label">Easy</div>
                      <div className="difficulty-time">30 seconds</div>
                    </div>
                    <div className="difficulty medium">
                      <div className="difficulty-label">Medium</div>
                      <div className="difficulty-time">45 seconds</div>
                    </div>
                    <div className="difficulty hard">
                      <div className="difficulty-label">Hard</div>
                      <div className="difficulty-time">60 seconds</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="section-title">
                <Award />
                Types of Riddles
              </h3>
              <div className="riddle-types">
                <div className="info-box">
                  <h4 className="info-title">Word Riddles</h4>
                  <p className="info-text">
                    Classic riddles that play with words and meanings, requiring you to think metaphorically and
                    consider multiple interpretations.
                  </p>
                  <p className="info-example">
                    Example: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind.
                    What am I?" (Answer: Echo)
                  </p>
                </div>
                <div className="info-box">
                  <h4 className="info-title">Logic Puzzles</h4>
                  <p className="info-text">
                    Challenges that require deductive reasoning and logical thinking to arrive at the correct solution.
                  </p>
                  <p className="info-example">
                    Example: "What has a head and a tail, but no body?" (Answer: Coin)
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="section-title">Educational Benefits</h3>
              <ul className="benefits-list">
                <li>Enhances critical thinking and problem-solving skills</li>
                <li>Improves lateral thinking and creativity</li>
                <li>Boosts vocabulary and language comprehension</li>
                <li>Develops patience and persistence</li>
                <li>Provides mental exercise in an entertaining format</li>
                <li>Encourages thinking outside conventional patterns</li>
              </ul>
            </section>

            <div className="action-container">
              <a href="/games/riddles" className="play-button">
                Play Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}