import React from 'react';
import { FaTrophy, FaPlay, FaPause } from 'react-icons/fa';

interface ScoreBoardProps {
  score: number;
  highScore: number;
  isPlaying: boolean;
  onTogglePause: () => void;
  onReset: () => void;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  highScore,
  isPlaying,
  onTogglePause,
  onReset,
}) => {
  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-800 rounded-lg shadow-lg">
      <div className="flex gap-8">
        <div className="text-center">
          <p className="text-gray-400 text-sm">Score</p>
          <p className="text-2xl font-bold text-white">{score}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm flex items-center gap-1">
            <FaTrophy className="text-yellow-500" /> Best
          </p>
          <p className="text-2xl font-bold text-white">{highScore}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onTogglePause}
          className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ScoreBoard;