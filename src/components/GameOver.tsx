import React from 'react';
import { FaRedo } from 'react-icons/fa';

interface GameOverProps {
  score: number;
  onReset: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, onReset }) => {
  return (
    <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Game Over!</h2>
        <p className="text-gray-300 mb-4">Final Score: {score}</p>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors flex items-center gap-2 mx-auto"
        >
          <FaRedo />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default GameOver;