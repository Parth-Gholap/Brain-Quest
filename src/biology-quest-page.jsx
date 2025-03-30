// BiologyQuestGame.jsx
import React, { useState, useEffect, useRef } from "react";
import { Home, Microscope, AlertCircle, CheckCircle2, HelpCircle, ArrowRight } from "lucide-react";
import "./biology-quest-page.css";

// Define types for TypeScript equivalent in JSX
// Level and QuestionType definitions
// Question type definition with fields

const BiologyQuestGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState("middle");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameQuestions, setGameQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const timerRef = useRef(null);
  const confettiCanvasRef = useRef(null);

  // Sample questions data
  const biologyQuestions = [
    // Middle School Level - Knowledge Questions
    {
      id: 1,
      text: "Which organelle is known as the 'powerhouse of the cell'?",
      options: ["Nucleus", "Mitochondria", "Golgi apparatus", "Endoplasmic reticulum"],
      correctAnswer: 1,
      explanation:
        "Mitochondria are often called the powerhouse of the cell because they generate most of the cell's supply of adenosine triphosphate (ATP), which is used as a source of chemical energy.",
      hint: "This organelle is responsible for cellular respiration and energy production.",
      level: "middle",
      type: "knowledge",
      topic: "Cell Biology",
    },
    {
      id: 2,
      text: "What is the process by which plants make their own food using sunlight?",
      options: ["Respiration", "Photosynthesis", "Fermentation", "Digestion"],
      correctAnswer: 1,
      explanation:
        "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water, generating oxygen as a byproduct.",
      hint: "This process converts light energy into chemical energy.",
      level: "middle",
      type: "knowledge",
      topic: "Plant Biology",
    },
    {
        id: 3,
        text: "Which of the following is NOT a function of the skeletal system?",
        options: ["Support", "Protection", "Movement", "Digestion"],
        correctAnswer: 3,
        explanation:
          "The skeletal system provides support, protection, and allows for movement, but digestion is a function of the digestive system.",
        hint: "Think about which system processes food in the body.",
        level: "middle",
        type: "knowledge",
        topic: "Human Anatomy",
      },
      {
        id: 4,
        text: "What is the main function of red blood cells?",
        options: ["Fighting infection", "Carrying oxygen", "Blood clotting", "Producing antibodies"],
        correctAnswer: 1,
        explanation:
          "Red blood cells (erythrocytes) contain hemoglobin, which binds to oxygen and transports it from the lungs to the tissues throughout the body.",
        hint: "These cells contain hemoglobin and give blood its color.",
        level: "middle",
        type: "knowledge",
        topic: "Human Physiology",
      },
    
      // Middle School Level - Case Questions
      {
        id: 5,
        text: "A student observes a pond sample under a microscope and sees small, green organisms moving around. These organisms are likely:",
        options: ["Bacteria", "Fungi", "Protists", "Viruses"],
        correctAnswer: 2,
        explanation:
          "Small, green, moving organisms in pond water are likely protists, specifically algae like Euglena or Chlamydomonas, which contain chloroplasts for photosynthesis and can move using flagella.",
        hint: "These organisms are eukaryotic and some can photosynthesize.",
        level: "middle",
        type: "case",
        topic: "Microbiology",
      },
      {
        id: 6,
        text: "A gardener notices that plants in a shaded area of the garden are taller and have larger leaves than the same species in a sunny area. This adaptation is most likely due to:",
        options: [
          "The plants trying to reach more sunlight",
          "Genetic mutations",
          "The soil being more fertile in the shade",
          "Less water evaporation in the shade",
        ],
        correctAnswer: 0,
        explanation:
          "Plants in shaded areas often grow taller with larger leaves to capture more sunlight for photosynthesis. This is an example of phototropism and adaptation to low-light conditions.",
        hint: "Think about what resource the plants might be competing for in a shaded area.",
        level: "middle",
        type: "case",
        topic: "Plant Biology",
      },
      {
        id: 7,
        text: "A student notices that when they exercise, their heart rate and breathing rate increase. This response helps to:",
        options: [
          "Reduce body temperature",
          "Increase oxygen delivery to muscles",
          "Decrease carbon dioxide production",
          "Slow down metabolism",
        ],
        correctAnswer: 1,
        explanation:
          "During exercise, muscles need more oxygen and produce more carbon dioxide. Increased heart rate delivers more oxygen-rich blood to muscles, while increased breathing rate brings in more oxygen and removes carbon dioxide.",
        hint: "Think about what your muscles need more of during physical activity.",
        level: "middle",
        type: "case",
        topic: "Human Physiology",
      },
    
      // High School Level - Knowledge Questions
      {
        id: 8,
        text: "Which of the following is a correct statement about DNA replication?",
        options: [
          "It is a conservative process",
          "It occurs during prophase",
          "It results in two identical DNA molecules",
          "It requires RNA polymerase",
        ],
        correctAnswer: 2,
        explanation:
          "DNA replication is semiconservative, occurring during the S phase of the cell cycle (not prophase), and results in two identical DNA molecules. It requires DNA polymerase, not RNA polymerase.",
        hint: "Think about the end result of the replication process.",
        level: "high",
        type: "knowledge",
        topic: "Molecular Biology",
      },
      {
        id: 9,
        text: "Which of the following is NOT a component of the theory of natural selection?",
        options: [
          "Variation exists within populations",
          "Organisms produce more offspring than can survive",
          "Traits are acquired during an organism's lifetime",
          "Beneficial traits are passed to offspring",
        ],
        correctAnswer: 2,
        explanation:
          "Natural selection involves variation, overproduction of offspring, and inheritance of beneficial traits. However, it does not include Lamarck's idea that traits acquired during an organism's lifetime can be passed to offspring.",
        hint: "This incorrect component was proposed by Lamarck, not Darwin.",
        level: "high",
        type: "knowledge",
        topic: "Evolution",
      },
      {
        id: 10,
        text: "In cellular respiration, where is the most ATP produced?",
        options: ["Glycolysis", "Krebs cycle", "Electron transport chain", "Fermentation"],
        correctAnswer: 2,
        explanation:
          "The electron transport chain produces the most ATP during cellular respiration (about 32-34 ATP), compared to glycolysis (2 ATP) and the Krebs cycle (2 ATP).",
        hint: "This stage uses oxygen as the final electron acceptor.",
        level: "high",
        type: "knowledge",
        topic: "Cell Biology",
      },
      {
        id: 11,
        text: "Which of the following best describes the function of enzymes?",
        options: [
          "Provide energy for cellular reactions",
          "Increase the activation energy of reactions",
          "Catalyze biochemical reactions",
          "Transport molecules across cell membranes",
        ],
        correctAnswer: 2,
        explanation:
          "Enzymes are biological catalysts that speed up biochemical reactions by lowering the activation energy required, without being consumed in the reaction.",
        hint: "These proteins speed up reactions without being consumed.",
        level: "high",
        type: "knowledge",
        topic: "Biochemistry",
      },
    
      // High School Level - Case Questions
      {
        id: 12,
        text: "A researcher studying pea plants observes that when a plant with purple flowers (PP) is crossed with a plant with white flowers (pp), all the offspring have purple flowers. This demonstrates:",
        options: ["Incomplete dominance", "Codominance", "Complete dominance", "Multiple alleles"],
        correctAnswer: 2,
        explanation:
          "This is an example of complete dominance, where the dominant allele (P) for purple flowers completely masks the expression of the recessive allele (p) for white flowers, resulting in all purple-flowered offspring (Pp).",
        hint: "Think about how the dominant trait is expressed in the heterozygous offspring.",
        level: "high",
        type: "case",
        topic: "Genetics",
      },
      {
        id: 13,
        text: "A patient has symptoms including frequent urination, increased thirst, and high blood sugar levels. These symptoms are most consistent with:",
        options: ["Hypothyroidism", "Diabetes mellitus", "Addison's disease", "Cushing's syndrome"],
        correctAnswer: 1,
        explanation:
          "Frequent urination (polyuria), increased thirst (polydipsia), and high blood sugar (hyperglycemia) are classic symptoms of diabetes mellitus, a disorder of glucose regulation due to insufficient insulin or insulin resistance.",
        hint: "This condition affects the body's ability to regulate blood glucose levels.",
        level: "high",
        type: "case",
        topic: "Human Physiology",
      },
      {
        id: 14,
        text: "A marine biologist observes that a certain species of fish has declined in population after the introduction of a new predator species. Over several generations, the remaining fish develop faster swimming speeds. This is an example of:",
        options: ["Genetic drift", "Gene flow", "Natural selection", "Artificial selection"],
        correctAnswer: 2,
        explanation:
          "This scenario describes natural selection. The predator creates a selective pressure favoring fish that can swim faster, leading to an increase in the frequency of genes for faster swimming in the population over generations.",
        hint: "This evolutionary mechanism involves differential survival and reproduction based on advantageous traits.",
        level: "high",
        type: "case",
        topic: "Evolution",
      },
    
      // Undergraduate Level - Knowledge Questions
      {
        id: 15,
        text: "Which of the following is NOT involved in post-transcriptional modification of eukaryotic mRNA?",
        options: ["Addition of a 5' cap", "Addition of a poly-A tail", "Removal of introns", "Translation"],
        correctAnswer: 3,
        explanation:
          "Translation is not a post-transcriptional modification; it's the process of protein synthesis from mRNA. The other options (5' cap, poly-A tail, and intron removal through splicing) are all post-transcriptional modifications of eukaryotic mRNA.",
        hint: "Think about which process occurs after mRNA has left the nucleus.",
        level: "undergrad",
        type: "knowledge",
        topic: "Molecular Biology",
      },
      {
        id: 16,
        text: "Which of the following best describes the concept of Hardy-Weinberg equilibrium?",
        options: [
          "Evolution is always occurring in populations",
          "Allele frequencies change predictably over time",
          "Allele frequencies remain constant in the absence of evolutionary forces",
          "Natural selection is the primary driver of evolution",
        ],
        correctAnswer: 2,
        explanation:
          "Hardy-Weinberg equilibrium states that allele and genotype frequencies in a population will remain constant from generation to generation in the absence of evolutionary forces (mutation, natural selection, genetic drift, gene flow, and non-random mating).",
        hint: "This principle provides a theoretical baseline for measuring evolutionary change.",
        level: "undergrad",
        type: "knowledge",
        topic: "Population Genetics",
      },
      {
        id: 17,
        text: "In the citric acid cycle (Krebs cycle), which molecule is oxidized to produce CO₂?",
        options: ["Pyruvate", "Acetyl-CoA", "Citrate", "α-Ketoglutarate"],
        correctAnswer: 3,
        explanation:
          "α-Ketoglutarate is oxidized and decarboxylated to form succinyl-CoA, releasing CO₂ in one of the steps of the citric acid cycle where carbon dioxide is produced.",
        hint: "This molecule undergoes oxidative decarboxylation in the cycle.",
        level: "undergrad",
        type: "knowledge",
        topic: "Biochemistry",
      },
      {
        id: 18,
        text: "Which of the following is a characteristic of paracrine signaling?",
        options: [
          "Signaling molecules travel through the bloodstream",
          "Target cells are distant from the signaling cell",
          "Signaling molecules affect only the cell that produced them",
          "Signaling molecules affect nearby cells",
        ],
        correctAnswer: 3,
        explanation:
          "Paracrine signaling involves the release of signaling molecules that affect only nearby cells. This differs from endocrine signaling (through bloodstream to distant cells), autocrine signaling (affecting the cell that produced the signal), and direct contact signaling.",
        hint: "This type of signaling acts locally but not on the originating cell.",
        level: "undergrad",
        type: "knowledge",
        topic: "Cell Biology",
      },
    
      // Undergraduate Level - Case Questions
      {
        id: 19,
        text: "A researcher studying a rare genetic disorder observes that the condition appears to affect males more frequently than females and is passed from mothers to sons. This inheritance pattern is most consistent with:",
        options: [
          "Autosomal dominant inheritance",
          "Autosomal recessive inheritance",
          "X-linked recessive inheritance",
          "Y-linked inheritance",
        ],
        correctAnswer: 2,
        explanation:
          "X-linked recessive disorders typically affect males more frequently than females because males have only one X chromosome. Females need two copies of the recessive allele to express the trait, while males need only one. The pattern of transmission from mothers to sons is also characteristic of X-linked inheritance.",
        hint: "Think about which sex chromosome males inherit from their mothers.",
        level: "undergrad",
        type: "case",
        topic: "Genetics",
      },
      {
        id: 20,
        text: "A microbiologist isolates a bacterium that can grow on minimal media containing only glucose as a carbon source. When the bacterium is exposed to lactose, there is a lag phase before it begins to metabolize lactose efficiently. This phenomenon is best explained by:",
        options: ["Bacterial transformation", "Conjugation", "Enzyme induction", "Transduction"],
        correctAnswer: 2,
        explanation:
          "This describes enzyme induction, specifically the lac operon in E. coli. When lactose is present, it induces the expression of genes needed to metabolize lactose. The lag phase represents the time needed for the bacterium to synthesize these enzymes.",
        hint: "This process involves the regulation of gene expression in response to an environmental signal.",
        level: "undergrad",
        type: "case",
        topic: "Microbiology",
      },
      {
        id: 21,
        text: "A patient with normal blood pressure develops hypertension after being prescribed a medication that inhibits the enzyme that converts angiotensin I to angiotensin II. The most likely explanation is:",
        options: [
          "The medication is functioning as expected",
          "The patient has developed tolerance to the medication",
          "The medication is causing a paradoxical effect",
          "The patient has a rare genetic variant affecting drug metabolism",
        ],
        correctAnswer: 2,
        explanation:
          "This is a paradoxical effect. ACE inhibitors, which block the conversion of angiotensin I to angiotensin II, typically lower blood pressure. If hypertension develops, it suggests the drug is having the opposite of its intended effect, possibly due to compensatory mechanisms or an unusual physiological response.",
        hint: "Consider what the normal effect of inhibiting this enzyme would be and how this case differs.",
        level: "undergrad",
        type: "case",
        topic: "Pharmacology",
      },
      {
        id: 22,
        text: "An ecologist studying a forest ecosystem observes that after a wildfire, certain plant species quickly colonize the burned area, but are gradually replaced by different species over time. This process is an example of:",
        options: ["Primary succession", "Secondary succession", "Climax community", "Ecological niche partitioning"],
        correctAnswer: 1,
        explanation:
          "Secondary succession occurs when an ecosystem is disturbed but not completely destroyed (soil remains). After a wildfire, pioneer species colonize first, followed by a predictable sequence of species until a relatively stable climax community is reached.",
        hint: "This type of ecological succession occurs after a disturbance to an existing ecosystem.",
        level: "undergrad",
        type: "case",
        topic: "Ecology",
      },
  ];

  // Filter questions based on level
  const filterQuestions = (level) => {
    // Filter questions by level
    const filteredQuestions = biologyQuestions.filter((q) => q.level === level);

    // Ensure a mix of case and knowledge questions
    const caseQuestions = filteredQuestions.filter((q) => q.type === "case");
    const knowledgeQuestions = filteredQuestions.filter((q) => q.type === "knowledge");

    // Shuffle both arrays
    const shuffledCase = [...caseQuestions].sort(() => Math.random() - 0.5);
    const shuffledKnowledge = [...knowledgeQuestions].sort(() => Math.random() - 0.5);

    // Take up to 5 of each type, or fewer if not enough questions
    const selectedCase = shuffledCase.slice(0, Math.min(5, shuffledCase.length));
    const selectedKnowledge = shuffledKnowledge.slice(0, Math.min(5, shuffledKnowledge.length));

    // Combine and shuffle again
    return [...selectedCase, ...selectedKnowledge].sort(() => Math.random() - 0.5);
  };

  // Start the game
  const startGame = () => {
    const questions = filterQuestions(level);

    if (questions.length === 0) {
      alert("No questions available for the selected level. Please try a different level.");
      return;
    }

    setGameQuestions(questions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowHint(false);
    setHintsUsed(0);
    setGameStarted(true);
    setGameOver(false);

    // Start timer for first question
    startTimer(level);
  };

  // Start timer based on level
  const startTimer = (level) => {
    let seconds = 0;

    switch (level) {
      case "middle":
        seconds = 30;
        break;
      case "high":
        seconds = 45;
        break;
      case "undergrad":
        seconds = 60;
        break;
      default:
        seconds = 30;
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
          if (!showExplanation) {
            setShowResult(true);
          }
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

    const currentQuestion = gameQuestions[currentQuestionIndex];
    const isCorrect = index === currentQuestion.correctAnswer;

    if (isCorrect) {
      // Calculate score based on level, time left, and hints used
      const questionScore = level === "middle" ? 10 : level === "high" ? 15 : 20;

      // Bonus for time left (up to 50% bonus)
      const timeBonus = Math.floor((timeLeft / getMaxTime(level)) * (questionScore * 0.5));

      // Penalty for using hints (25% reduction per hint)
      const hintPenalty = showHint ? Math.floor(questionScore * 0.25) : 0;

      // Calculate final score
      const finalScore = questionScore + timeBonus - hintPenalty;

      setScore(score + finalScore);

      // We would add confetti effect here if imported
      // For simplified version, we're omitting the confetti
    }

    // Show explanation
    setShowExplanation(true);

    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Get maximum time based on level
  const getMaxTime = (level) => {
    switch (level) {
      case "middle":
        return 30;
      case "high":
        return 45;
      case "undergrad":
        return 60;
      default:
        return 30;
    }
  };

  // Move to next question
  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowHint(false);
    setShowResult(false);

    if (currentQuestionIndex < gameQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);

      // Start timer for next question
      startTimer(level);
    } else {
      // Game completed
      setGameOver(true);
    }
  };

  // Handle showing hint
  const handleShowHint = () => {
    setShowHint(true);
    setHintsUsed(hintsUsed + 1);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Get level display name
  const getLevelDisplayName = (level) => {
    switch (level) {
      case "middle":
        return "Middle School (8th-10th grade)";
      case "high":
        return "High School (11th-12th grade)";
      case "undergrad":
        return "Undergraduate";
      default:
        return "Unknown Level";
    }
  };

  // Current question
  const currentQuestion = gameQuestions[currentQuestionIndex];

  // Calculate final score percentage
  const scorePercentage =
    gameQuestions.length > 0
      ? Math.round((score / (gameQuestions.length * (level === "middle" ? 15 : level === "high" ? 22 : 30))) * 100)
      : 0;

  // Get feedback based on score percentage
  const getFeedback = () => {
    if (scorePercentage >= 90) return "Outstanding! You have exceptional biology knowledge!";
    if (scorePercentage >= 75) return "Great job! You have a solid understanding of biology concepts.";
    if (scorePercentage >= 60) return "Good work! You've demonstrated good biology knowledge.";
    if (scorePercentage >= 40) return "Nice effort! Keep studying to improve your biology knowledge.";
    return "Keep practicing! Biology takes time to master.";
  };

  // Helper to add conditional classes
  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <div className="biology-quest">
      <div className="container">
        <div className="header">
          <h1 className="title">Biology Quest</h1>
          <a href="/" className="back-button">
            <Home className="icon" />
            Back to Home
          </a>
        </div>

        {!gameStarted ? (
          <div className="start-screen">
            <h2 className="subtitle">Biology Quest Challenge</h2>

            <div className="start-content">
              <p className="description">
                Test your biology knowledge with questions ranging from cell biology to ecology. Choose your academic
                level to begin.
              </p>

              <div className="level-select">
                <label htmlFor="level" className="select-label">
                  Academic Level
                </label>
                <select 
                  id="level" 
                  className="select" 
                  onChange={(e) => setLevel(e.target.value)} 
                  defaultValue="middle"
                >
                  <option value="middle">Middle School (8th-10th grade)</option>
                  <option value="high">High School (11th-12th grade)</option>
                  <option value="undergrad">Undergraduate</option>
                </select>
              </div>

              <div className="instructions">
                <h3 className="instructions-title">How to Play:</h3>
                <ul className="instructions-list">
                  <li>Answer biology questions before time runs out</li>
                  <li>Questions include both general knowledge and case-based scenarios</li>
                  <li>Use hints if you're stuck (but your score will be reduced)</li>
                  <li>Learn from explanations after each question</li>
                  <li>Higher levels have more challenging questions but higher point values</li>
                </ul>
              </div>

              <button onClick={startGame} className="start-button">
                Start Game
              </button>
            </div>
          </div>
        ) : (
          <div className="game-container">
            {!gameOver ? (
              <div className="question-container">
                <div className="question-header">
                  <div className="question-indicator">
                    <Microscope className="icon" />
                    <span>
                      Question {currentQuestionIndex + 1} of {gameQuestions.length}
                    </span>
                  </div>
                  <div className="score-level">
                    <div className="score">Score: {score}</div>
                    <div className="level-badge">
                      {getLevelDisplayName(level)}
                    </div>
                  </div>
                </div>

                {!showExplanation && (
                  <div className="timer-container">
                    <div className="timer-header">
                      <div className="timer-label">Time Remaining</div>
                      <div className={classNames(
                        "timer-value",
                        timeLeft > getMaxTime(level) * 0.6
                          ? "timer-high"
                          : timeLeft > getMaxTime(level) * 0.3
                            ? "timer-medium"
                            : "timer-low"
                      )}>
                        {timeLeft} seconds
                      </div>
                    </div>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${(timeLeft / getMaxTime(level)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="question-content">
                  <div className="question-type-container">
                    <h2 className="question-type">
                      {currentQuestion?.type === "case" ? "Case Study" : "Knowledge Question"}
                    </h2>
                    <span className="topic-tag">
                      {currentQuestion?.topic}
                    </span>
                  </div>

                  <div className="question-text-container">
                    <p className="question-text">{currentQuestion?.text}</p>

                    {showHint && currentQuestion?.hint && (
                      <div className="hint-container">
                        <div className="hint-content">
                          <HelpCircle className="icon" />
                          <p className="hint-text">{currentQuestion.hint}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="options-container">
                  {currentQuestion?.options.map((option, index) => (
                    <button
                      key={index}
                      className={classNames(
                        "option-button",
                        selectedAnswer === null
                          ? ""
                          : selectedAnswer === index && index === currentQuestion.correctAnswer
                            ? "option-correct"
                            : selectedAnswer === index
                              ? "option-incorrect"
                              : index === currentQuestion.correctAnswer
                                ? "option-correct-reveal"
                                : "option-neutral"
                      )}
                      onClick={() => handleAnswerSelection(index)}
                      disabled={selectedAnswer !== null || timeLeft === 0}
                    >
                      <div className="option-content">
                        <div className="option-icon">
                          {selectedAnswer !== null && (
                            <>
                              {index === currentQuestion.correctAnswer ? (
                                <CheckCircle2 className="icon" />
                              ) : selectedAnswer === index ? (
                                <AlertCircle className="icon" />
                              ) : null}
                            </>
                          )}
                        </div>
                        <div>{option}</div>
                      </div>
                    </button>
                  ))}
                </div>

                {showExplanation && (
                  <div className="explanation-container">
                    <h3 className="explanation-title">Explanation:</h3>
                    <p className="explanation-text">{currentQuestion?.explanation}</p>
                  </div>
                )}

                <div className="actions-container">
                  {!showExplanation && !showHint && currentQuestion?.hint && (
                    <button
                      className="hint-button"
                      onClick={handleShowHint}
                      disabled={selectedAnswer !== null || timeLeft === 0}
                    >
                      <HelpCircle className="icon" />
                      Use Hint
                    </button>
                  )}

                  {!showExplanation && (!currentQuestion?.hint || showHint) && (
                    <div></div> // Empty div for spacing when hint button is not shown
                  )}

                  {showExplanation && (
                    <button onClick={nextQuestion} className="next-button">
                      {currentQuestionIndex < gameQuestions.length - 1 ? (
                        <>
                          Next Question
                          <ArrowRight className="icon" />
                        </>
                      ) : (
                        "See Results"
                      )}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="results-container">
                <h2 className="results-title">Quiz Complete!</h2>

                <div className="score-summary">
                  <div className="percentage">{scorePercentage}%</div>
                  <p className="final-score">Final Score: {score}</p>
                  <p className="feedback">{getFeedback()}</p>
                </div>

                <div className="performance-summary">
                  <h3 className="summary-title">Performance Summary:</h3>
                  <div className="summary-stats">
                    <p>• Level: {getLevelDisplayName(level)}</p>
                    <p>• Questions Answered: {gameQuestions.length}</p>
                    <p>• Hints Used: {hintsUsed}</p>
                  </div>
                </div>

                <div className="final-actions">
                  <button onClick={startGame} className="play-again-button">
                    Play Again
                  </button>
                  <a href="/" className="home-button">
                    Back to Home
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Result Dialog */}
        {showResult && !showExplanation && (
          <div className="modal-overlay" onClick={() => setShowResult(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="times-up">⏰</div>
                <h3 className="times-up-title">Time's Up!</h3>
                <p className="times-up-message">You didn't select an answer in time.</p>
                <button
                  onClick={() => {
                    setShowResult(false);
                    setShowExplanation(true);
                  }}
                  className="show-answer-button"
                >
                  Show Answer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hidden canvas for confetti */}
        <canvas ref={confettiCanvasRef} className="confetti-canvas" />
      </div>
    </div>
  );
};

export default BiologyQuestGame;