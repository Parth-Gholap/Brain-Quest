import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import confetti from "canvas-confetti";
import { Home, Eye, Clock } from "lucide-react";
import "./memory-match-page.css";

// Card pairs with terms and definitions across different subjects
const cardPairs = [
  // Math
  { term: "2x", definition: "Derivative of x²", subject: "Math" },
  { term: "a² + b² = c²", definition: "Pythagorean Theorem", subject: "Math" },
  { term: "(-b ± √(b² - 4ac)) / 2a", definition: "Quadratic Formula", subject: "Math" },
  { term: "∫", definition: "Integral Symbol", subject: "Math" },
  { term: "π", definition: "Ratio of circumference to diameter", subject: "Math" },
  { term: "∞", definition: "Infinity", subject: "Math" },

  // Science/Biology
  { term: "ATP", definition: "Adenosine Triphosphate", subject: "Biology" },
  { term: "DNA", definition: "Deoxyribonucleic Acid", subject: "Biology" },
  { term: "H₂O", definition: "Water", subject: "Chemistry" },
  { term: "E = mc²", definition: "Mass-Energy Equivalence", subject: "Physics" },
  { term: "NaCl", definition: "Sodium Chloride", subject: "Chemistry" },
  { term: "CO₂", definition: "Carbon Dioxide", subject: "Chemistry" },

  // Computer Science
  { term: "HTML", definition: "Hypertext Markup Language", subject: "CS" },
  { term: "CSS", definition: "Cascading Style Sheets", subject: "CS" },
  { term: "API", definition: "Application Programming Interface", subject: "CS" },
  { term: "SQL", definition: "Structured Query Language", subject: "CS" },
  { term: "RAM", definition: "Random Access Memory", subject: "CS" },
  { term: "CPU", definition: "Central Processing Unit", subject: "CS" },

  // General Knowledge
  { term: "Paris", definition: "Capital of France", subject: "Geography" },
  { term: "H₂O", definition: "Chemical formula for water", subject: "Chemistry" },
  { term: "UN", definition: "United Nations", subject: "Politics" },
  { term: "WWW", definition: "World Wide Web", subject: "Internet" },
  { term: "NASA", definition: "National Aeronautics and Space Administration", subject: "Space" },
  { term: "WHO", definition: "World Health Organization", subject: "Health" },

  // Keyboard Shortcuts
  { term: "Ctrl+C", definition: "Copy selected text or item", subject: "Shortcuts" },
  { term: "Ctrl+V", definition: "Paste copied text or item", subject: "Shortcuts" },
  { term: "Ctrl+Z", definition: "Undo last action", subject: "Shortcuts" },
  { term: "Ctrl+A", definition: "Select all items", subject: "Shortcuts" },
  { term: "Ctrl+F", definition: "Find text in document", subject: "Shortcuts" },
  { term: "Alt+Tab", definition: "Switch between open applications", subject: "Shortcuts" },
];

const difficultySettings = {
  easy: { pairs: 6, time: 60, previewTime: 5 },
  medium: { pairs: 8, time: 90, previewTime: 3 },
  hard: { pairs: 12, time: 120, previewTime: 2 },
};

function Button({ onClick, className, children, variant = "primary", size = "md" }) {
  const buttonClass = `button button-${variant} button-${size} ${className || ""}`;
  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}

function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;

  return createPortal(
    <div className="dialog-overlay" onClick={() => onOpenChange(false)}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}

function Select({ onValueChange, defaultValue, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const selectRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    setValue(val);
    onValueChange(val);
    setIsOpen(false);
  };

  return (
    <div className="select-container" ref={selectRef}>
      <div className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
        {children.props.children.find((item) => item.props.value === value)?.props.children || "Select an option"}
      </div>
      {isOpen && <div className="select-content">{children}</div>}
    </div>
  );
}

function SelectContent({ children }) {
  return <div className="select-items">{children}</div>;
}

function SelectItem({ value, children, onClick }) {
  return (
    <div className="select-item" onClick={() => onClick(value)}>
      {children}
    </div>
  );
}

export default function MemoryMatchGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isPreviewPhase, setIsPreviewPhase] = useState(false);
  const [previewTimeLeft, setPreviewTimeLeft] = useState(0);

  const timerRef = useRef(null);
  const previewTimerRef = useRef(null);
  const confettiCanvasRef = useRef(null);
  const canFlip = useRef(true);

  // Generate cards based on difficulty
  const generateCards = (difficulty) => {
    const { pairs } = difficultySettings[difficulty];

    // Shuffle and select card pairs
    const selectedPairs = [...cardPairs].sort(() => Math.random() - 0.5).slice(0, pairs);

    // Create cards from pairs
    const cards = [];
    selectedPairs.forEach((pair, index) => {
      // Term card
      cards.push({
        id: index * 2,
        content: pair.term,
        type: "term",
        matchId: index,
        matched: false,
        flipped: false,
      });

      // Definition card
      cards.push({
        id: index * 2 + 1,
        content: pair.definition,
        type: "definition",
        matchId: index,
        matched: false,
        flipped: false,
      });
    });

    // Shuffle cards
    return cards.sort(() => Math.random() - 0.5);
  };

  // Start the game
  const startGame = () => {
    const newCards = generateCards(difficulty);
    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setTimeLeft(difficultySettings[difficulty].time);
    setGameStarted(true);
    setGameOver(false);
    setGameWon(false);

    // Start preview phase
    setIsPreviewPhase(true);
    setPreviewTimeLeft(difficultySettings[difficulty].previewTime);

    // Show all cards during preview
    setCards(newCards.map((card) => ({ ...card, flipped: true })));

    // Start preview timer
    if (previewTimerRef.current) {
      clearInterval(previewTimerRef.current);
    }

    previewTimerRef.current = setInterval(() => {
      setPreviewTimeLeft((prev) => {
        if (prev <= 1) {
          // Preview time's up
          clearInterval(previewTimerRef.current);
          setIsPreviewPhase(false);

          // Hide all cards
          setCards(newCards.map((card) => ({ ...card, flipped: false })));

          // Start main game timer
          startMainTimer();

          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Start the main game timer
  const startMainTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up
          clearInterval(timerRef.current);
          setGameOver(true);
          setShowResult(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle card click
  const handleCardClick = (id) => {
    // Prevent clicking if in preview phase
    if (isPreviewPhase) return;

    // Prevent clicking if animation is in progress or card is already matched/flipped
    if (!canFlip.current || flippedCards.length >= 2) return;

    const clickedCard = cards.find((card) => card.id === id);
    if (!clickedCard || clickedCard.matched || flippedCards.includes(id)) return;

    // Flip the card
    const newCards = cards.map((card) => (card.id === id ? { ...card, flipped: true } : card));
    setCards(newCards);

    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // Check for match if two cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);

      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards.find((card) => card.id === firstId);
      const secondCard = newCards.find((card) => card.id === secondId);

      if (firstCard?.matchId === secondCard?.matchId) {
        // Match found
        const updatedCards = newCards.map((card) =>
          card.id === firstId || card.id === secondId ? { ...card, matched: true } : card
        );
        setCards(updatedCards);
        setFlippedCards([]);
        setMatchedPairs(matchedPairs + 1);

        // Check if all pairs are matched
        if (matchedPairs + 1 === difficultySettings[difficulty].pairs) {
          // Game won
          setGameWon(true);
          setGameOver(true);
          setShowResult(true);

          // Clear timer
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }

          // Trigger confetti
          if (confettiCanvasRef.current) {
            confetti({
              particleCount: 200,
              spread: 70,
              origin: { y: 0.6 },
            });
          }
        }
      } else {
        // No match, flip cards back after a delay
        canFlip.current = false;
        setTimeout(() => {
          setCards(newCards.map((card) => (newFlippedCards.includes(card.id) ? { ...card, flipped: false } : card)));
          setFlippedCards([]);
          canFlip.current = true;
        }, 1000);
      }
    }
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (previewTimerRef.current) {
        clearInterval(previewTimerRef.current);
      }
    };
  }, []);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Get card background color based on type
  const getCardColor = (card) => {
    if (!card.flipped && !card.matched) return "card-back";
    if (card.type === "term") return "card-term";
    return "card-definition";
  };

  return (
    <div className="memory-game-container">
      <div className="container">
        <div className="header">
          <h1 className="game-title">Concept Match</h1>
          <a href="/" className="home-link">
            <Button variant="outline" size="sm" className="home-button">
              <Home className="icon" />
              Back to Home
            </Button>
          </a>
        </div>

        {!gameStarted ? (
          <div className="start-screen">
            <h2 className="start-title">Concept Match Challenge</h2>

            <div className="start-content">
              <p className="start-description">
                Test your memory by matching terms with their definitions across different subjects. Choose your
                difficulty level to begin.
              </p>

              <div className="difficulty-selector">
                <label htmlFor="difficulty" className="difficulty-label">
                  Difficulty Level
                </label>
                <Select onValueChange={(value) => setDifficulty(value)} defaultValue="easy">
                  <SelectContent>
                    <SelectItem value="easy" onClick={() => setDifficulty("easy")}>
                      Easy (6 pairs, 5s preview)
                    </SelectItem>
                    <SelectItem value="medium" onClick={() => setDifficulty("medium")}>
                      Medium (8 pairs, 3s preview)
                    </SelectItem>
                    <SelectItem value="hard" onClick={() => setDifficulty("hard")}>
                      Hard (12 pairs, 2s preview)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="how-to-play">
                <h3 className="how-to-play-title">How to Play:</h3>
                <ul className="instructions-list">
                  <li>Cards will be revealed briefly at the start</li>
                  <li>Click on cards to flip them</li>
                  <li>Match terms with their definitions</li>
                  <li>Find all matching pairs before time runs out</li>
                  <li>Remember card positions to make fewer moves</li>
                </ul>
              </div>

              <Button onClick={startGame} className="start-button">
                Start Game
              </Button>
            </div>
          </div>
        ) : (
          <div className="game-board-container">
            <div className="game-board">
              <div className="game-stats">
                <div className="stats-left">
                  {isPreviewPhase ? (
                    <div className="stat-item preview-timer">
                      <Eye className="stat-icon" />
                      <span className="stat-label">Preview: </span>
                      <span className="preview-time-value">{previewTimeLeft}s</span>
                    </div>
                  ) : (
                    <div className="stat-item timer">
                      <Clock className="stat-icon" />
                      <span className="stat-label">Time: </span>
                      <span className={`time-value ${timeLeft > 30 ? "time-good" : timeLeft > 15 ? "time-warning" : "time-danger"}`}>
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                  )}
                  <div className="stat-item moves-counter">
                    <span className="stat-label">Moves: </span>
                    <span className="moves-value">{moves}</span>
                  </div>
                </div>
                <div className="stat-item pairs-counter">
                  <span className="stat-label">Pairs: </span>
                  <span className="pairs-value">
                    {matchedPairs}/{difficultySettings[difficulty].pairs}
                  </span>
                </div>
              </div>

              <div className={`cards-grid grid-${difficulty}`}>
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className={`card-container ${card.matched ? "card-matched" : ""}`}
                    onClick={() => !gameOver && handleCardClick(card.id)}
                  >
                    <div className={`card ${card.flipped || card.matched ? "card-flipped" : ""}`}>
                      {/* Card Back */}
                      <div className="card-face card-back">
                        <span className="card-back-symbol">?</span>
                      </div>

                      {/* Card Front */}
                      <div className={`card-face card-front ${getCardColor(card)}`}>
                        <span className="card-content">{card.content}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {isPreviewPhase && (
                <div className="preview-message">
                  <p>Memorize the cards! They will be hidden in {previewTimeLeft} seconds.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Result Dialog */}
        <Dialog open={showResult} onOpenChange={setShowResult}>
          <div className="result-dialog">
            {gameWon ? (
              <>
                <div className="result-emoji">🎉</div>
                <h3 className="result-title win">You Win!</h3>
                <p className="result-message">
                  You found all pairs in {moves} moves with {formatTime(timeLeft)} remaining!
                </p>
              </>
            ) : (
              <>
                <div className="result-emoji">⏰</div>
                <h3 className="result-title lose">Time's Up!</h3>
                <p className="result-message">
                  You found {matchedPairs} out of {difficultySettings[difficulty].pairs} pairs.
                </p>
              </>
            )}

            <div className="result-actions">
              <Button onClick={startGame} className="play-again-button">
                Play Again
              </Button>
              <a href="/">
                <Button variant="outline" className="back-button">
                  Back to Home
                </Button>
              </a>
            </div>
          </div>
        </Dialog>

        {/* Hidden canvas for confetti */}
        <canvas ref={confettiCanvasRef} className="confetti-canvas" />
      </div>
    </div>
  );
}