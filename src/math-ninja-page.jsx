// MathMastery.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import "./math-ninja-page.css";

// Import custom components to replace shadcn UI components
// import HomeIcon from "./icons/HomeIcon"; // Create this simple icon component

function MathNinjaGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [operation, setOperation] = useState("mixed");
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [problems, setProblems] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [level, setLevel] = useState(1);
  const [showMultipleChoice, setShowMultipleChoice] = useState(false);
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState([]);

  const timerRef = useRef(null);
  const confettiCanvasRef = useRef(null);
  const inputRef = useRef(null);

  // Generate a math problem
  const generateProblem = (difficulty, operation) => {
    let num1, num2, answer, question, op;

    // Determine operation
    if (operation === "mixed") {
      // Include calculus in higher levels
      const operations =
        level > 3
          ? ["addition", "subtraction", "multiplication", "division", "calculus"]
          : ["addition", "subtraction", "multiplication", "division"];
      op = operations[Math.floor(Math.random() * operations.length)];
    } else {
      op = operation;
    }

    // For calculus problems
    if (op === "calculus") {
      return generateCalculusProblem(difficulty);
    }

    // Generate numbers based on difficulty and operation
    switch (difficulty) {
      case "easy":
        switch (op) {
          case "addition":
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            answer = num1 + num2;
            question = `${num1} + ${num2} = ?`;
            break;
          case "subtraction":
            num1 = Math.floor(Math.random() * 10) + 10;
            num2 = Math.floor(Math.random() * 10) + 1;
            answer = num1 - num2;
            question = `${num1} - ${num2} = ?`;
            break;
          case "multiplication":
            num1 = Math.floor(Math.random() * 5) + 1;
            num2 = Math.floor(Math.random() * 5) + 1;
            answer = num1 * num2;
            question = `${num1} × ${num2} = ?`;
            break;
          case "division":
            num2 = Math.floor(Math.random() * 5) + 1;
            num1 = num2 * (Math.floor(Math.random() * 5) + 1);
            answer = num1 / num2;
            question = `${num1} ÷ ${num2} = ?`;
            break;
          default:
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            answer = num1 + num2;
            question = `${num1} + ${num2} = ?`;
        }
        break;

      case "medium":
        switch (op) {
          case "addition":
            num1 = Math.floor(Math.random() * 50) + 10;
            num2 = Math.floor(Math.random() * 50) + 10;
            answer = num1 + num2;
            question = `${num1} + ${num2} = ?`;
            break;
          case "subtraction":
            num1 = Math.floor(Math.random() * 50) + 50;
            num2 = Math.floor(Math.random() * 50) + 10;
            answer = num1 - num2;
            question = `${num1} - ${num2} = ?`;
            break;
          case "multiplication":
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            answer = num1 * num2;
            question = `${num1} × ${num2} = ?`;
            break;
          case "division":
            num2 = Math.floor(Math.random() * 9) + 2;
            num1 = num2 * (Math.floor(Math.random() * 10) + 1);
            answer = num1 / num2;
            question = `${num1} ÷ ${num2} = ?`;
            break;
          default:
            num1 = Math.floor(Math.random() * 50) + 10;
            num2 = Math.floor(Math.random() * 50) + 10;
            answer = num1 + num2;
            question = `${num1} + ${num2} = ?`;
        }
        break;

      case "hard":
        switch (op) {
          case "addition":
            num1 = Math.floor(Math.random() * 100) + 50;
            num2 = Math.floor(Math.random() * 100) + 50;
            answer = num1 + num2;
            question = `${num1} + ${num2} = ?`;
            break;
          case "subtraction":
            num1 = Math.floor(Math.random() * 100) + 100;
            num2 = Math.floor(Math.random() * 100) + 50;
            answer = num1 - num2;
            question = `${num1} - ${num2} = ?`;
            break;
          case "multiplication":
            num1 = Math.floor(Math.random() * 12) + 2;
            num2 = Math.floor(Math.random() * 12) + 2;
            answer = num1 * num2;
            question = `${num1} × ${num2} = ?`;
            break;
          case "division":
            num2 = Math.floor(Math.random() * 11) + 2;
            num1 = num2 * (Math.floor(Math.random() * 12) + 1);
            answer = num1 / num2;
            question = `${num1} ÷ ${num2} = ?`;
            break;
          default:
            num1 = Math.floor(Math.random() * 100) + 50;
            num2 = Math.floor(Math.random() * 100) + 50;
            answer = num1 + num2;
            question = `${num1} + ${num2} = ?`;
        }
        break;

      default: // mixed difficulty
        const difficulties = ["easy", "medium", "hard"];
        const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
        return generateProblem(randomDifficulty, operation);
    }

    return {
      question,
      answer,
      difficulty: difficulty === "mixed" ? (answer < 20 ? "easy" : answer < 100 ? "medium" : "hard") : difficulty,
      operation: op,
    };
  };

  // Generate calculus problems
  const generateCalculusProblem = (difficulty) => {
    // Predefined calculus problems with LaTeX
    const calculusProblems = [
      // Derivatives - Easy
      {
        question: "What is the derivative of f(x) = x²?",
        answer: 2,
        latex: "\\frac{d}{dx}(x^2) = ?",
        difficulty: "easy",
      },
      {
        question: "What is the derivative of f(x) = 3x?",
        answer: 3,
        latex: "\\frac{d}{dx}(3x) = ?",
        difficulty: "easy",
      },
      {
        question: "What is the derivative of f(x) = 5?",
        answer: 0,
        latex: "\\frac{d}{dx}(5) = ?",
        difficulty: "easy",
      },

      // Derivatives - Medium
      {
        question: "What is the derivative of f(x) = x³?",
        answer: 3,
        latex: "\\frac{d}{dx}(x^3) = 3x^2 \\text{ at } x = 1",
        difficulty: "medium",
      },
      {
        question: "What is the derivative of f(x) = sin(x) at x = 0?",
        answer: 1,
        latex: "\\frac{d}{dx}(\\sin(x)) \\text{ at } x = 0",
        difficulty: "medium",
      },
      {
        question: "What is the derivative of f(x) = e^x at x = 0?",
        answer: 1,
        latex: "\\frac{d}{dx}(e^x) \\text{ at } x = 0",
        difficulty: "medium",
      },

      // Derivatives - Hard
      {
        question: "What is the derivative of f(x) = ln(x) at x = 1?",
        answer: 1,
        latex: "\\frac{d}{dx}(\\ln(x)) \\text{ at } x = 1",
        difficulty: "hard",
      },
      {
        question: "What is the derivative of f(x) = x²sin(x) at x = 0?",
        answer: 0,
        latex: "\\frac{d}{dx}(x^2\\sin(x)) \\text{ at } x = 0",
        difficulty: "hard",
      },

      // Integrals - Easy
      {
        question: "What is ∫ 2 dx?",
        answer: 2,
        latex: "\\int 2 \\, dx = 2x + C \\text{, so the coefficient is?}",
        difficulty: "easy",
      },
      {
        question: "What is ∫ x dx evaluated from x = 0 to x = 2?",
        answer: 2,
        latex: "\\int_{0}^{2} x \\, dx = ?",
        difficulty: "easy",
      },

      // Integrals - Medium
      {
        question: "What is ∫ x² dx evaluated from x = 0 to x = 3?",
        answer: 9,
        latex: "\\int_{0}^{3} x^2 \\, dx = ?",
        difficulty: "medium",
      },
      {
        question: "What is the coefficient in the antiderivative of 4x³?",
        answer: 1,
        latex: "\\int 4x^3 \\, dx = x^4 + C \\text{, so the coefficient is?}",
        difficulty: "medium",
      },

      // Integrals - Hard
      {
        question: "What is ∫ sin(x) dx evaluated from x = 0 to x = π?",
        answer: 2,
        latex: "\\int_{0}^{\\pi} \\sin(x) \\, dx = ?",
        difficulty: "hard",
      },
      {
        question: "What is ∫ e^x dx evaluated from x = 0 to x = 1?",
        answer: 1.718,
        latex: "\\int_{0}^{1} e^x \\, dx \\approx ? \\text{ (round to 3 decimal places)}",
        difficulty: "hard",
      },
    ];

    // Filter by difficulty
    const filteredProblems =
      difficulty === "mixed" ? calculusProblems : calculusProblems.filter((p) => p.difficulty === difficulty);

    // Select a random problem
    const randomProblem = filteredProblems[Math.floor(Math.random() * filteredProblems.length)];

    return {
      ...randomProblem,
      operation: "calculus",
    };
  };

  // Generate a set of problems
  const generateProblems = (count, difficulty, operation) => {
    const problems = [];

    for (let i = 0; i < count; i++) {
      problems.push(generateProblem(difficulty, operation));
    }

    return problems;
  };

  // Generate multiple choice options
  const generateMultipleChoiceOptions = (correctAnswer) => {
    const options = [correctAnswer];

    // Generate 3 more unique options
    while (options.length < 4) {
      let option;

      // For integer answers
      if (Number.isInteger(correctAnswer)) {
        // Generate an option within ±5 of the correct answer
        option = correctAnswer + Math.floor(Math.random() * 10) - 5;

        // Ensure it's not the same as the correct answer and not already in options
        if (option !== correctAnswer && !options.includes(option) && option >= 0) {
          options.push(option);
        }
      } else {
        // For decimal answers, round to 3 decimal places and add/subtract small values
        option = Math.round((correctAnswer + (Math.random() * 0.6 - 0.3)) * 1000) / 1000;

        // Ensure it's not the same as the correct answer and not already in options
        if (Math.abs(option - correctAnswer) > 0.001 && !options.includes(option) && option >= 0) {
          options.push(option);
        }
      }
    }

    // Shuffle the options
    return options.sort(() => Math.random() - 0.5);
  };

  // Start the game
  const startGame = () => {
    const problemCount = 10;
    const newProblems = generateProblems(problemCount, difficulty, operation);

    setProblems(newProblems);
    setCurrentProblemIndex(0);
    setScore(0);
    setGameStarted(true);
    setGameOver(false);
    setLevel(1);

    // Determine if we should use multiple choice for calculus problems
    const useMultipleChoice = operation === "calculus" || (operation === "mixed" && level > 3);

    setShowMultipleChoice(useMultipleChoice);

    if (useMultipleChoice) {
      setMultipleChoiceOptions(generateMultipleChoiceOptions(newProblems[0].answer));
    }

    // Start timer for first problem
    startTimer(newProblems[0].difficulty);
  };

  // Start timer based on problem difficulty
  const startTimer = (difficulty) => {
    let seconds = 0;

    switch (difficulty) {
      case "easy":
        seconds = 20;
        break;
      case "medium":
        seconds = 30;
        break;
      case "hard":
        seconds = 45;
        break;
      default:
        seconds = 20;
    }

    // Add extra time for calculus problems
    if (problems[currentProblemIndex]?.operation === "calculus") {
      seconds += 15;
    }

    setTimeLeft(seconds);

    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Start new timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up
          clearInterval(timerRef.current);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle time up
  const handleTimeUp = () => {
    setShowResult(true);
    setIsCorrect(false);
  };

  // Handle answer submission
  const handleSubmit = () => {
    const currentProblem = problems[currentProblemIndex];

    // Check if answer is correct
    const userAnswerNum = Number.parseFloat(userAnswer);

    // For calculus problems with decimal answers, allow a small margin of error
    const isAnswerCorrect =
      currentProblem.operation === "calculus" && !Number.isInteger(currentProblem.answer)
        ? Math.abs(userAnswerNum - currentProblem.answer) < 0.01
        : userAnswerNum === currentProblem.answer;

    setIsCorrect(isAnswerCorrect);
    setShowResult(true);

    if (isAnswerCorrect) {
      setScore(score + 1);

      // Trigger confetti for correct answer
      if (confettiCanvasRef.current) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }

    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Handle multiple choice selection
  const handleMultipleChoiceSelection = (selectedAnswer) => {
    const currentProblem = problems[currentProblemIndex];

    // For calculus problems with decimal answers, allow a small margin of error
    const isAnswerCorrect =
      currentProblem.operation === "calculus" && !Number.isInteger(currentProblem.answer)
        ? Math.abs(selectedAnswer - currentProblem.answer) < 0.01
        : selectedAnswer === currentProblem.answer;

    setUserAnswer(selectedAnswer.toString());
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);

    if (isAnswerCorrect) {
      setScore(score + 1);

      // Trigger confetti for correct answer
      if (confettiCanvasRef.current) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }

    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Move to next problem
  const nextProblem = () => {
    setShowResult(false);
    setUserAnswer("");

    if (currentProblemIndex < problems.length - 1) {
      const nextIndex = currentProblemIndex + 1;
      setCurrentProblemIndex(nextIndex);

      // Generate new multiple choice options if needed
      if (showMultipleChoice || problems[nextIndex].operation === "calculus") {
        setShowMultipleChoice(true);
        setMultipleChoiceOptions(generateMultipleChoiceOptions(problems[nextIndex].answer));
      } else {
        setShowMultipleChoice(false);
      }

      // Start timer for next problem
      startTimer(problems[nextIndex].difficulty);

      // Focus on input if not multiple choice
      if (!showMultipleChoice && inputRef.current) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    } else {
      // Level completed
      if (score >= problems.length * 0.7) {
        // Advance to next level if score is at least 70%
        const nextLevel = level + 1;
        setLevel(nextLevel);

        // Generate new problems for next level
        let newDifficulty = difficulty;

        // Increase difficulty based on current level
        if (nextLevel > 2 && difficulty === "easy") {
          newDifficulty = "medium";
        } else if (nextLevel > 4 && difficulty === "medium") {
          newDifficulty = "hard";
        }

        const newProblems = generateProblems(10, newDifficulty, operation);

        setProblems(newProblems);
        setCurrentProblemIndex(0);
        setScore(0);

        // Determine if we should use multiple choice
        const useMultipleChoice =
          operation === "calculus" ||
          (operation === "mixed" && nextLevel > 3) ||
          newProblems[0].operation === "calculus";

        setShowMultipleChoice(useMultipleChoice);

        if (useMultipleChoice) {
          setMultipleChoiceOptions(generateMultipleChoiceOptions(newProblems[0].answer));
        }

        // Start timer for first problem of new level
        startTimer(newProblems[0].difficulty);

        // Focus on input if not multiple choice
        if (!useMultipleChoice && inputRef.current) {
          setTimeout(() => {
            inputRef.current?.focus();
          }, 100);
        }
      } else {
        // Game over if score is less than 70%
        setGameOver(true);
      }
    }
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Current problem
  const currentProblem = problems[currentProblemIndex];

  // Calculate timer progress percentage
  const getTimerProgressWidth = () => {
    const maxTime = 
      currentProblem?.difficulty === "easy"
        ? 20
        : currentProblem?.difficulty === "medium"
          ? 30
          : 45;
    
    return (timeLeft / maxTime) * 100 + "%";
  };

  // Get timer class based on time remaining
  const getTimerClass = () => {
    if (timeLeft > 15) return "timer-value high";
    if (timeLeft > 7) return "timer-value medium";
    return "timer-value low";
  };

  // Get difficulty badge class
  const getDifficultyClass = () => {
    if (!currentProblem) return "";
    
    switch (currentProblem.difficulty) {
      case "easy": return "difficulty-badge difficulty-easy";
      case "medium": return "difficulty-badge difficulty-medium";
      case "hard": return "difficulty-badge difficulty-hard";
      default: return "difficulty-badge difficulty-easy";
    }
  };

  // Custom dialog component
  const ResultDialog = ({ open, onClose, children }) => {
    if (!open) return null;
    
    return (
      <div className="dialog-overlay" onClick={onClose}>
        <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="body">
      <div className="container">
        <div className="header">
          <h1>Math Mastery</h1>
          <Link to="/" className="back-button">
            <HomeIcon /> Back to Home
          </Link>
        </div>

        {!gameStarted ? (
          <div className="game-setup">
            <h2>Math Mastery Challenge</h2>

            <div className="setup-content">
              <p>
                Test your math skills by solving problems quickly. Advance through levels by maintaining a high score!
              </p>

              <div className="form-group">
                <label htmlFor="difficulty">Starting Difficulty</label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="operation">Operation Type</label>
                <select
                  id="operation"
                  value={operation}
                  onChange={(e) => setOperation(e.target.value)}
                >
                  <option value="mixed">Mixed</option>
                  <option value="addition">Addition</option>
                  <option value="subtraction">Subtraction</option>
                  <option value="multiplication">Multiplication</option>
                  <option value="division">Division</option>
                  <option value="calculus">Calculus (Integration & Differentiation)</option>
                </select>
              </div>

              <div className="how-to-play">
                <h3>How to Play:</h3>
                <ul>
                  <li>Solve math problems before time runs out</li>
                  <li>Each problem has a time limit based on difficulty</li>
                  <li>Score at least 70% to advance to the next level</li>
                  <li>Difficulty increases as you advance through levels</li>
                  <li>Higher levels include calculus problems</li>
                </ul>
              </div>

              <button className="primary-button" onClick={startGame}>
                Start Game
              </button>
            </div>
          </div>
        ) : (
          <div className="game-area">
            {!gameOver ? (
              <div className="game-content">
                <div className="game-header">
                  <div className="problem-counter">
                    Problem {currentProblemIndex + 1} of {problems.length}
                  </div>
                  <div className="score-container">
                    <div className="score">
                      Score: {score}/{problems.length}
                    </div>
                    <div className="level-badge">
                      Level {level}
                    </div>
                  </div>
                </div>

                <div className="timer-container">
                  <div className="timer-header">
                    <div className="timer-label">Time Remaining</div>
                    <div className={getTimerClass()}>
                      {timeLeft} seconds
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: getTimerProgressWidth() }}
                    ></div>
                  </div>
                </div>

                <div className="problem-section">
                  <div className="problem-header">
                    <h2 className="problem-title">Problem</h2>
                    {currentProblem && (
                      <div className={getDifficultyClass()}>
                        {currentProblem.difficulty}
                      </div>
                    )}
                  </div>

                  <div className="problem-display">
                    {currentProblem?.latex ? (
                      <div className="problem-card">
                        <div className="latex-problem">{currentProblem.question}</div>
                        <div className="latex">{currentProblem.latex}</div>
                      </div>
                    ) : (
                      <p className="problem-card problem-text">
                        {currentProblem?.question}
                      </p>
                    )}
                  </div>
                </div>

                <div className="answer-section">
                  {showMultipleChoice ? (
                    <div>
                      <label className="answer-label">Select the correct answer:</label>
                      <div className="multiple-choice-grid">
                        {multipleChoiceOptions.map((option, index) => (
                          <button
                            key={index}
                            className="choice-button"
                            onClick={() => handleMultipleChoiceSelection(option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="answer" className="answer-label">
                        Your Answer
                      </label>
                      <input
                        ref={inputRef}
                        id="answer"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                        type="number"
                        step="any"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSubmit();
                          }
                        }}
                      />
                    </div>
                  )}

                  {!showMultipleChoice && (
                    <div className="submit-container">
                      <button onClick={handleSubmit} className="submit-button">
                        Submit Answer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="game-over">
                <h2>Game Over!</h2>

                <div className="level-score">{level}</div>
                <p className="level-label">Levels Completed</p>

                <p className="result-text">
                  You reached level {level} with a final score of {score}/{problems.length}.
                </p>

                <div className="button-group">
                  <button onClick={startGame} className="primary-button">
                    Play Again
                  </button>
                  <Link to="/">
                    <button className="outline-button">
                      Back to Home
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Result Dialog */}
        <ResultDialog open={showResult} onClose={() => nextProblem()}>
          <div className="result-container">
            {isCorrect ? (
              <>
                <div className="result-emoji">🎉</div>
                <h3 className="result-title correct">Correct!</h3>
                <p className="result-message">Great job! You solved the problem.</p>
              </>
            ) : (
              <>
                <div className="result-emoji">😢</div>
                <h3 className="result-title incorrect">
                  {timeLeft === 0 ? "Time's Up!" : "Incorrect!"}
                </h3>
                <p className="result-message">The correct answer was:</p>
                <p className="correct-answer">{currentProblem?.answer}</p>
              </>
            )}
            <button onClick={nextProblem} className="primary-button">
              {currentProblemIndex < problems.length - 1 ? "Next Problem" : "Continue"}
            </button>
          </div>
        </ResultDialog>

        {/* Hidden canvas for confetti */}
        <canvas ref={confettiCanvasRef} className="confetti-canvas" />
      </div>
    </div>
  );
}

export default MathNinjaGame;

// Simple HomeIcon component
function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );
}