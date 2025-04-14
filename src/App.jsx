import { Routes, Route } from 'react-router-dom';  // Import all JSX components 
import Home from './home';  // Game pages/components 
import BiologyQuestInfo from './BiologyQuestInfo'; 
import BiologyQuest from './biology-quest-page'; 
import MathNinja from './math-ninja-page'; 
import MathMasteryInfo from './MathNinjainfo'; // Added the new component
import CodeBreaker from './code-breaker-page'; 
import CodeBreakerInfo from './CodeBreakerInfo'; 
import MemoryMatch from './memory-match-page'; 
import MemoryMatchInfo from './MemoryMatchInfo'; 
import QuizLadderInfo from './quiz-ladder-info-page'; 
import QuizLadder from './quiz-ladder-page'; 
import Riddles from './riddles-page'; 
import Sudoku from './sudoku-page'; 
import WordScramble from './word-scramble-page'; 
import AttackSimulator from './AttackSimulator'; 
import AttackSimulatorInfo from './AttackSimulatorInfo';
import FontsLoader from "./fonts-loader"; 
import SplashScreen from "./SplashScreen";  
import SudokuInfo from './SudokuInfo';
import RiddlesGame from './RiddlesInfo';

function App() {   
  return (     
    <div className="app-container">       
      <Routes>         
        {/* Home Route */}         
        <Route path="/" element={<SplashScreen />} />         
        <Route path='/home' element={<Home/>} />
                 
        {/* Game Routes */}         
        <Route path="/biology-quest-info" element={<BiologyQuestInfo />} />         
        <Route path="/biology-quest" element={<BiologyQuest />} />         
        <Route path="/math-ninja" element={<MathNinja />} />         
        <Route path="/math-ninja-info" element={<MathMasteryInfo />} />
        <Route path="/code-breaker" element={<CodeBreaker />} />         
        <Route path="/code-breaker-info" element={<CodeBreakerInfo />} />         
        <Route path="/memory-match" element={<MemoryMatch />} />         
        <Route path="/memory-match-info" element={<MemoryMatchInfo />} />         
        <Route path="/quiz-ladder-info" element={<QuizLadderInfo />} />         
        <Route path="/quiz-ladder" element={<QuizLadder />} />         
        <Route path="/riddles" element={<Riddles />} />         
        <Route path="/sudoku" element={<Sudoku />} />         
        <Route path="/word-scramble" element={<WordScramble />} />         
        <Route path="/AttackSimulator" element={<AttackSimulator />} />  
        <Route path="/AttackSimulator-Info" element={<AttackSimulatorInfo />} />
        <Route path="/FontsLoader" element={<FontsLoader/>} />  
        <Route path="/sudoku-info"element={<SudokuInfo />} />
        <Route path="/riddles-info" element={<RiddlesGame />} />
      </Routes>     
    </div>   
  ); 
}  

export default App;