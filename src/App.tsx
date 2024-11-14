import React from 'react';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import GameOver from './components/GameOver';
import { useGameLogic } from './hooks/useGameLogic';

const App: React.FC = () => {
  const { snake, food, score, highScore, isPlaying, gameOver, gridSize, reset, togglePause } = useGameLogic();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-4xl font-bold text-white text-center">Snake Game</h1>
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <GameBoard snake={snake} food={food} gridSize={gridSize} />
          {gameOver && <GameOver score={score} onReset={reset} />}
        </div>
        <ScoreBoard
          score={score}
          highScore={highScore}
          isPlaying={isPlaying}
          onTogglePause={togglePause}
          onReset={reset}
        />
      </div>
      <div className="text-gray-400 text-center">
        <p>Use arrow keys to move</p>
        <p>Press space to pause/resume</p>
      </div>
    </div>
  );
};

export default App;