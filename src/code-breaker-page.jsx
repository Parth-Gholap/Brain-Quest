import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import "./code-breaker-page.css"; // Import the CSS file

// Challenge data (unchanged from your original code)
const challenges = [
  {
    id: 1,
    title: "Variable Declaration",
    description: "Which of the following correctly declares a constant variable in JavaScript?",
    codeSnippet: "",
    options: ["var name = 'John';", "let name = 'John';", "const name = 'John';", "variable name = 'John';"],
    correctAnswer: 2,
    explanation: "In JavaScript, 'const' is used to declare a constant variable that cannot be reassigned.",
    difficulty: "easy",
    category: "syntax",
  },
  {
    id: 2,
    title: "Array Methods",
    description: "Which method adds one or more elements to the end of an array?",
    codeSnippet: "const numbers = [1, 2, 3];",
    options: ["numbers.push(4);", "numbers.pop();", "numbers.shift();", "numbers.unshift(4);"],
    correctAnswer: 0,
    explanation: "The push() method adds one or more elements to the end of an array and returns the new length.",
    difficulty: "easy",
    category: "syntax",
  },
  {
    id: 3,
    title: "Function Syntax",
    description: "Which is a correct way to write an arrow function in JavaScript?",
    codeSnippet: "",
    options: [
      "function add(a, b) { return a + b; }",
      "const add = (a, b) => { return a + b; }",
      "const add = function(a, b) { return a + b; }",
      "function add = (a, b) => { return a + b; }",
    ],
    correctAnswer: 1,
    explanation:
      "Arrow functions are defined using the => syntax. The correct form is 'const functionName = (parameters) => { code }'.",
    difficulty: "medium",
    category: "syntax",
  },

  // Concepts Challenges
  {
    id: 4,
    title: "Object-Oriented Programming",
    description: "Which concept describes bundling data and methods that operate on that data within a single unit?",
    codeSnippet: "",
    options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
    correctAnswer: 2,
    explanation:
      "Encapsulation is the bundling of data and methods that operate on that data within a single unit, like a class.",
    difficulty: "medium",
    category: "concepts",
  },
  {
    id: 5,
    title: "Data Structures",
    description: "Which data structure operates on a Last-In-First-Out (LIFO) principle?",
    codeSnippet: "",
    options: ["Queue", "Stack", "Linked List", "Binary Tree"],
    correctAnswer: 1,
    explanation:
      "A stack follows the Last-In-First-Out (LIFO) principle, where the last element added is the first one to be removed.",
    difficulty: "medium",
    category: "concepts",
  },
  {
    id: 6,
    title: "Recursion",
    description: "What is recursion in programming?",
    codeSnippet: "",
    options: [
      "A loop that runs infinitely",
      "A function that calls itself",
      "A method to optimize code",
      "A way to declare variables",
    ],
    correctAnswer: 1,
    explanation: "Recursion is when a function calls itself to solve a smaller instance of the same problem.",
    difficulty: "easy",
    category: "concepts",
  },

  // Debugging Challenges
  {
    id: 7,
    title: "Find the Bug",
    description: "What's wrong with this code?",
    codeSnippet: `function calculateSum(numbers) {
  let sum = 0;
  for (let i = 0; i <= numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}`,
    options: [
      "The sum variable should be initialized to null",
      "The loop should start from i = 1",
      "The loop condition should be i < numbers.length",
      "The function name is incorrect",
    ],
    correctAnswer: 2,
    explanation:
      "The loop condition should be i < numbers.length (not <=). With <= it will try to access an index that doesn't exist.",
    difficulty: "medium",
    category: "debugging",
  },
  {
    id: 8,
    title: "Scope Error",
    description: "What's wrong with this code?",
    codeSnippet: `function printMessage() {
  if (true) {
    let message = "Hello";
  }
  console.log(message);
}`,
    options: [
      "The if condition is always true",
      "message is not defined in the scope where it's being accessed",
      "console.log should be inside the if block",
      "The function has no return statement",
    ],
    correctAnswer: 1,
    explanation:
      "The variable 'message' is declared with 'let' inside the if block, so it's only accessible within that block. Outside the block, it's not defined.",
    difficulty: "medium",
    category: "debugging",
  },
  {
    id: 9,
    title: "Async Bug",
    description: "What's wrong with this code?",
    codeSnippet: `function fetchData() {
  let data;
  fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(result => {
      data = result;
    });
  return data;
}`,
    options: [
      "The fetch API is used incorrectly",
      "The function should be async",
      "The data is returned before the fetch completes",
      "The .then() syntax is incorrect",
    ],
    correctAnswer: 2,
    explanation:
      "The function returns 'data' immediately, before the fetch operation completes. The fetch is asynchronous, so 'data' will be undefined when returned.",
    difficulty: "hard",
    category: "debugging",
  },

  // Algorithms Challenges
  {
    id: 10,
    title: "Time Complexity",
    description: "What is the time complexity of binary search?",
    codeSnippet: "",
    options: ["O(n)", "O(n²)", "O(log n)", "O(n log n)"],
    correctAnswer: 2,
    explanation:
      "Binary search has a time complexity of O(log n) because it divides the search interval in half with each step.",
    difficulty: "medium",
    category: "algorithms",
  },
  {
    id: 11,
    title: "Sorting Algorithm",
    description: "Which sorting algorithm has the worst average-case time complexity?",
    codeSnippet: "",
    options: ["Quick Sort", "Merge Sort", "Bubble Sort", "Heap Sort"],
    correctAnswer: 2,
    explanation:
      "Bubble Sort has an average time complexity of O(n²), which is worse than Quick Sort, Merge Sort, and Heap Sort, which all have O(n log n).",
    difficulty: "hard",
    category: "algorithms",
  },
  {
    id: 12,
    title: "Algorithm Selection",
    description: "Which algorithm would be best for finding the shortest path in a weighted graph?",
    codeSnippet: "",
    options: ["Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Dijkstra's Algorithm", "Binary Search"],
    correctAnswer: 2,
    explanation:
      "Dijkstra's Algorithm is specifically designed to find the shortest path in a weighted graph, as long as there are no negative weights.",
    difficulty: "hard",
    category: "algorithms",
  },

  // More Syntax Challenges
  {
    id: 13,
    title: "String Methods",
    description: "Which method is used to extract a portion of a string without modifying the original string?",
    codeSnippet: "const text = 'Hello, World!';",
    options: ["text.splice(7, 5);", "text.substring(7, 12);", "text.replace('World', '');", "text.indexOf('World');"],
    correctAnswer: 1,
    explanation:
      "The substring() method extracts characters from a string between two specified indices without modifying the original string.",
    difficulty: "easy",
    category: "syntax",
  },
  {
    id: 14,
    title: "Loop Syntax",
    description: "Which loop would be best for iterating over properties of an object?",
    codeSnippet: "const person = { name: 'John', age: 30, job: 'Developer' };",
    options: [
      "for (let i = 0; i < person.length; i++)",
      "for (let prop in person)",
      "for (let item of person)",
      "while (person.hasNext())",
    ],
    correctAnswer: 1,
    explanation: "The for...in loop is specifically designed to iterate over the enumerable properties of an object.",
    difficulty: "medium",
    category: "syntax",
  },

  // More Concepts Challenges
  {
    id: 15,
    title: "Asynchronous Programming",
    description: "What is a Promise in JavaScript?",
    codeSnippet: "",
    options: [
      "A function that always returns a value",
      "A proxy for a value not necessarily known when the promise is created",
      "A way to declare global variables",
      "A method to optimize code execution",
    ],
    correctAnswer: 1,
    explanation:
      "A Promise is an object representing the eventual completion or failure of an asynchronous operation and its resulting value.",
    difficulty: "hard",
    category: "concepts",
  },
  {
    id: 16,
    title: "Memory Management",
    description: "What is garbage collection in programming?",
    codeSnippet: "",
    options: [
      "Manually deleting variables when they're no longer needed",
      "Automatic process of freeing memory that's no longer in use",
      "Compressing data to save memory",
      "Allocating memory for new variables",
    ],
    correctAnswer: 1,
    explanation:
      "Garbage collection is an automatic process in which the runtime system reclaims memory that's no longer being used by the program.",
    difficulty: "medium",
    category: "concepts",
  },
  // Add more challenges here as per your original code...
];

function CodeBreakerGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("mixed");
  const [category, setCategory] = useState("all");
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [gameChallenges, setGameChallenges] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const timerRef = useRef(null);
  const confettiCanvasRef = useRef(null);

  // Filter challenges based on difficulty and category
  const filterChallenges = (difficulty, category) => {
    let filteredChallenges = [...challenges];
    if (difficulty !== "mixed") {
      filteredChallenges = filteredChallenges.filter((challenge) => challenge.difficulty === difficulty);
    }
    if (category !== "all") {
      filteredChallenges = filteredChallenges.filter((challenge) => challenge.category === category);
    }
    for (let i = filteredChallenges.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredChallenges[i], filteredChallenges[j]] = [filteredChallenges[j], filteredChallenges[i]];
    }
    return filteredChallenges.slice(0, 10);
  };

  // Start the game
  const startGame = () => {
    const challenges = filterChallenges(difficulty, category);
    if (challenges.length === 0) {
      alert("No challenges available for the selected filters. Please try different settings.");
      return;
    }
    setGameChallenges(challenges);
    setCurrentChallengeIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setGameStarted(true);
    setGameOver(false);
    startTimer(challenges[0].difficulty);
  };

  // Start timer based on challenge difficulty
  const startTimer = (difficulty) => {
    let seconds = difficulty === "easy" ? 30 : difficulty === "medium" ? 45 : 60;
    setTimeLeft(seconds);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (!showExplanation) setShowResult(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle answer selection
  const handleAnswerSelection = (index) => {
    if (selectedAnswer !== null || timeLeft === 0) return;
    setSelectedAnswer(index);
    const currentChallenge = gameChallenges[currentChallengeIndex];
    const isCorrect = index === currentChallenge.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      if (confettiCanvasRef.current) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }
    setShowExplanation(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Move to next challenge
  const nextChallenge = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowResult(false);
    if (currentChallengeIndex < gameChallenges.length - 1) {
      const nextIndex = currentChallengeIndex + 1;
      setCurrentChallengeIndex(nextIndex);
      startTimer(gameChallenges[nextIndex].difficulty);
    } else {
      setGameOver(true);
    }
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const currentChallenge = gameChallenges[currentChallengeIndex];

  return (
    <div className="game-container">
      <div className="header">
        <h1>Code Breaker</h1>
        <a href="/" className="home-button">Back to Home</a>
      </div>

      {!gameStarted ? (
        <div className="start-screen">
          <h2>Code Breaker Challenge</h2>
          <p>Test your programming knowledge with challenges covering syntax, concepts, debugging, and algorithms.</p>

          <div className="select-container">
            <label htmlFor="category">Challenge Category</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All Categories</option>
              <option value="syntax">Syntax</option>
              <option value="concepts">Programming Concepts</option>
              <option value="debugging">Debugging</option>
              <option value="algorithms">Algorithms</option>
            </select>
          </div>

          <div className="select-container">
            <label htmlFor="difficulty">Difficulty Level</label>
            <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="mixed">Mixed</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="how-to-play">
            <h3>How to Play:</h3>
            <ul>
              <li>Read each challenge carefully</li>
              <li>Select the correct answer before time runs out</li>
              <li>Learn from explanations after each question</li>
              <li>Complete all challenges to finish the game</li>
            </ul>
          </div>

          <button onClick={startGame} className="start-button">Start Game</button>
        </div>
      ) : (
        <div className="game-screen">
          {!gameOver ? (
            <div className="challenge-container">
              <div className="challenge-header">
                <span>Challenge {currentChallengeIndex + 1} of {gameChallenges.length}</span>
                <div className="stats">
                  <span>Score: {score}/{gameChallenges.length}</span>
                  <span className={`difficulty ${currentChallenge?.difficulty}`}>
                    {currentChallenge?.difficulty}
                  </span>
                  <span className="category">{currentChallenge?.category}</span>
                </div>
              </div>

              {!showExplanation && (
                <div className="timer">
                  <div className="timer-label">Time Remaining: {timeLeft} seconds</div>
                  <div
                    className="progress-bar"
                    style={{
                      width: `${
                        (timeLeft / (currentChallenge?.difficulty === "easy" ? 30 : currentChallenge?.difficulty === "medium" ? 45 : 60)) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              )}

              <div className="challenge-content">
                <h2>{currentChallenge?.title}</h2>
                <p>{currentChallenge?.description}</p>
                {currentChallenge?.codeSnippet && (
                  <pre className="code-snippet">{currentChallenge.codeSnippet}</pre>
                )}
              </div>

              <div className="options">
                {currentChallenge?.options.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`option-button ${
                      selectedAnswer === null
                        ? ""
                        : selectedAnswer === index && index === currentChallenge.correctAnswer
                        ? "correct"
                        : selectedAnswer === index
                        ? "incorrect"
                        : index === currentChallenge.correctAnswer
                        ? "correct"
                        : ""
                    }`}
                    onClick={() => handleAnswerSelection(index)}
                    disabled={selectedAnswer !== null || timeLeft === 0}
                    whileHover={selectedAnswer === null ? { scale: 1.01 } : {}}
                    whileTap={selectedAnswer === null ? { scale: 0.99 } : {}}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              {showExplanation && (
                <div className="explanation">
                  <h3>Explanation:</h3>
                  <p>{currentChallenge?.explanation}</p>
                </div>
              )}

              {(showExplanation || timeLeft === 0) && (
                <button onClick={nextChallenge} className="next-button">
                  {currentChallengeIndex < gameChallenges.length - 1 ? "Next Challenge" : "See Results"}
                </button>
              )}
            </div>
          ) : (
            <div className="game-over">
              <h2>Game Complete!</h2>
              <div className="score">{score}/{gameChallenges.length}</div>
              <p>
                {score === gameChallenges.length
                  ? "Perfect score! You're a coding master!"
                  : score >= gameChallenges.length * 0.7
                  ? "Great job! You have solid programming knowledge!"
                  : "Nice try! Keep practicing to improve your skills!"}
              </p>
              <div className="game-over-buttons">
                <button onClick={startGame} className="play-again-button">Play Again</button>
                <a href="/" className="home-button">Back to Home</a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Result Dialog */}
      {showResult && !showExplanation && (
        <div className="dialog">
          <div className="dialog-content">
            <div className="dialog-icon">⏰</div>
            <h3>Time's Up!</h3>
            <p>You didn't select an answer in time.</p>
            <button
              onClick={() => {
                setShowResult(false);
                setShowExplanation(true);
              }}
              className="dialog-button"
            >
              Show Answer
            </button>
          </div>
        </div>
      )}

      {/* Hidden canvas for confetti */}
      <canvas ref={confettiCanvasRef} className="confetti-canvas" />
    </div>
  );
}

export default CodeBreakerGame;
