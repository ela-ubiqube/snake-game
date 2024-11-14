import React, { useEffect, useRef } from 'react';
import { Position } from '../types';

interface GameBoardProps {
  snake: Position[];
  food: Position;
  gridSize: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ snake, food, gridSize }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvas.width / gridSize;

    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#10B981' : '#34D399';
      ctx.fillRect(
        segment.x * cellSize,
        segment.y * cellSize,
        cellSize - 1,
        cellSize - 1
      );
    });

    // Draw food
    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.arc(
      food.x * cellSize + cellSize / 2,
      food.y * cellSize + cellSize / 2,
      cellSize / 2 - 1,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }, [snake, food, gridSize]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className="border-4 border-gray-700 rounded-lg shadow-lg"
    />
  );
};

export default GameBoard;