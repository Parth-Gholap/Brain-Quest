
import React from "react";
import { BookOpen, Home, Grid, Settings, Trophy } from "lucide-react";
import "./SudokoInfo.css";

// Since we're converting from Next.js, we need to replace Link with a standard <a> tag
// and Button component with our own styled button

export default function SudokuInfo() {
  return (
    <div className="sudoku-container">
      <div className="container">
        <div className="header">
          <h1 className="title">Logic Grid</h1>
          <a href="/" className="back-button">
            <span className="icon-wrapper">
              <Home className="icon" />
            </span>
            Back to Home
          </a>
        </div>

        <div className="content-card">
          <div className="icon-header">
            <BookOpen className="large-icon" />
          </div>

          <h2 className="card-title">Logic Grid Challenge</h2>

          <div className="content-sections">
            <section>
              <h3 className="section-title">
                <Grid className="section-icon" />
                Game Overview
              </h3>
              <p className="section-text">
                Logic Grid is our educational version of the classic Sudoku puzzle game. It challenges your logical
                thinking, pattern recognition, and problem-solving skills. Fill the grid so that every row, column, and
                3×3 box contains the digits 1-9 without repetition.
              </p>
            </section>

            <section>
              <h3 className="section-title">
                <Settings className="section-icon" />
                How to Play
              </h3>
              <div className="subsections">
                <div className="info-box">
                  <h4 className="info-box-title">Game Rules</h4>
                  <ul className="info-list">
                    <li>Fill each empty cell with a number from 1-9</li>
                    <li>Each row must contain all digits from 1-9</li>
                    <li>Each column must contain all digits from 1-9</li>
                    <li>Each 3×3 box must contain all digits from 1-9</li>
                    <li>Use notes to keep track of possibilities</li>
                  </ul>
                </div>

                <div className="info-box">
                  <h4 className="info-box-title">Difficulty Levels</h4>
                  <div className="difficulty-grid">
                    <div className="difficulty-item">
                      <h5 className="difficulty-title">Easy</h5>
                      <p className="difficulty-text">
                        More numbers are provided at the start, making these puzzles suitable for beginners.
                      </p>
                    </div>
                    <div className="difficulty-item">
                      <h5 className="difficulty-title">Medium</h5>
                      <p className="difficulty-text">
                        Fewer starting numbers and requires more advanced logical deduction.
                      </p>
                    </div>
                    <div className="difficulty-item">
                      <h5 className="difficulty-title">Hard</h5>
                      <p className="difficulty-text">
                        Minimal starting numbers and requires complex logical strategies to solve.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="info-box">
                  <h4 className="info-box-title">Game Features</h4>
                  <ul className="info-list">
                    <li>Notes mode to track possible numbers for each cell</li>
                    <li>Timer to challenge yourself to improve your speed</li>
                    <li>Mistake counter to track your accuracy</li>
                    <li>Clear and intuitive interface with visual cues</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="section-title">
                <Trophy className="section-icon" />
                Strategies and Tips
              </h3>
              <div className="info-box">
                <ul className="info-list">
                  <li>Start with the most constrained cells (those with the fewest possibilities)</li>
                  <li>Use the process of elimination by checking rows, columns, and boxes</li>
                  <li>
                    Look for "naked pairs" - when two cells in a row, column, or box can only contain the same two
                    numbers
                  </li>
                  <li>Use the notes feature to keep track of possible numbers for each cell</li>
                  <li>
                    When stuck, look for "hidden singles" - when a number can only go in one cell within a row, column,
                    or box
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="section-title">Educational Benefits</h3>
              <ul className="benefits-list">
                <li>Enhances logical reasoning and critical thinking skills</li>
                <li>Improves pattern recognition and spatial awareness</li>
                <li>Develops problem-solving strategies and persistence</li>
                <li>Boosts concentration and attention to detail</li>
                <li>Provides mental exercise that can help with mathematical thinking</li>
                <li>Teaches the importance of systematic approaches to complex problems</li>
              </ul>
            </section>

            <div className="button-container">
              <a href="/games/sudoku" className="play-button">
                Play Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
