import React from "react";
import { Microscope, Home, Brain, Dna, Leaf, FlaskRoundIcon as Flask } from 'lucide-react';
import './BiologyQuestInfo.css';

export default function BiologyQuestInfo() {
  return (
    <div className="biology-quest-container">
      <div className="container">
        <div className="header">
          <h1 className="title">Biology Quest</h1>
          <a href="/" className="back-button">
            <Home className="icon-small" />
            Back to Home
          </a>
        </div>

        <div className="content-card">
          <div className="icon-container">
            <Microscope className="icon-large icon-teal" />
          </div>

          <h2 className="section-title">Biology Quest Challenge</h2>

          <div className="sections">
            <section>
              <h3 className="subsection-title">
                <Brain className="icon-small icon-teal" />
                Game Overview
              </h3>
              <p className="text-content">
                Biology Quest is an educational game designed to test and expand your knowledge of biological concepts
                across various difficulty levels. From cell biology to ecology, genetics to physiology, this game covers
                a wide range of topics to challenge students from middle school through undergraduate levels.
              </p>
            </section>

            <section>
              <h3 className="subsection-title">
                <Dna className="icon-small icon-teal" />
                Academic Levels
              </h3>
              <div className="academic-grid">
                <div className="level-card">
                  <h4 className="card-title">Middle School</h4>
                  <p className="card-text">
                    For 8th-10th grade students. Covers basic biological concepts with straightforward questions and
                    clear explanations.
                  </p>
                </div>
                <div className="level-card">
                  <h4 className="card-title">High School</h4>
                  <p className="card-text">
                    For 11th-12th grade students. Includes more complex topics and requires deeper understanding of
                    biological processes.
                  </p>
                </div>
                <div className="level-card">
                  <h4 className="card-title">Undergraduate</h4>
                  <p className="card-text">
                    College-level biology questions covering advanced topics and requiring application of concepts to
                    solve problems.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="subsection-title">
                <Leaf className="icon-small icon-teal" />
                Question Types
              </h3>
              <div className="question-grid">
                <div className="question-card">
                  <h4 className="card-title">Knowledge Questions</h4>
                  <p className="card-text">
                    Test your understanding of fundamental biological concepts, terminology, and processes across
                    various topics.
                  </p>
                </div>
                <div className="question-card">
                  <h4 className="card-title">Case-Based Scenarios</h4>
                  <p className="card-text">
                    Apply your knowledge to real-world biological problems and scenarios, requiring critical thinking
                    and analysis.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="subsection-title">
                <Flask className="icon-small icon-teal" />
                How to Play
              </h3>
              <ul className="instruction-list">
                <li>Select your academic level before starting the game</li>
                <li>Answer multiple-choice questions before the timer runs out</li>
                <li>Use hints when needed, but be aware they reduce your potential score</li>
                <li>Learn from detailed explanations after each question</li>
                <li>Track your progress and aim to improve your score with each game</li>
                <li>Higher difficulty levels offer more challenging questions but higher point values</li>
              </ul>
            </section>

            <section>
              <h3 className="subsection-title">Educational Benefits</h3>
              <ul className="benefits-list">
                <li>Reinforces key biological concepts across various topics</li>
                <li>Develops critical thinking skills through case-based scenarios</li>
                <li>Provides immediate feedback and detailed explanations</li>
                <li>Adapts to different academic levels for appropriate challenge</li>
                <li>Makes learning biology engaging and interactive</li>
                <li>Prepares students for exams and assessments</li>
              </ul>
            </section>

            <div className="button-container">
              <a href="/games/biology-quest" className="play-button">
                Play Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}