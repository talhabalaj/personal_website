import { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 16;
const INITIAL_SPEED = 150;

export function SnakeApp() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('snakeHighScore') || '0');
    }
    return 0;
  });

  const directionRef = useRef(direction);
  const gameRef = useRef<HTMLDivElement>(null);

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some((seg) => seg.x === newFood.x && seg.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setGameOver(false);
    setScore(0);
    setIsPlaying(false);
  }, [generateFood]);

  const moveSnake = useCallback(() => {
    if (!isPlaying || gameOver) return;

    setSnake((currentSnake) => {
      const head = { ...currentSnake[0] };
      const currentDirection = directionRef.current;

      switch (currentDirection) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        setIsPlaying(false);
        return currentSnake;
      }

      // Check self collision
      if (currentSnake.some((seg) => seg.x === head.x && seg.y === head.y)) {
        setGameOver(true);
        setIsPlaying(false);
        return currentSnake;
      }

      const newSnake = [head, ...currentSnake];

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((s) => {
          const newScore = s + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('snakeHighScore', String(newScore));
          }
          return newScore;
        });
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [isPlaying, gameOver, food, highScore, generateFood]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(moveSnake, INITIAL_SPEED);
    return () => clearInterval(interval);
  }, [isPlaying, moveSnake]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying && !gameOver && e.key === ' ') {
        e.preventDefault();
        setIsPlaying(true);
        return;
      }

      const keyDirectionMap: Record<string, Direction> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
        w: 'UP',
        s: 'DOWN',
        a: 'LEFT',
        d: 'RIGHT',
      };

      const newDirection = keyDirectionMap[e.key];
      if (!newDirection) return;

      e.preventDefault();

      const opposites: Record<Direction, Direction> = {
        UP: 'DOWN',
        DOWN: 'UP',
        LEFT: 'RIGHT',
        RIGHT: 'LEFT',
      };

      if (opposites[newDirection] !== directionRef.current) {
        directionRef.current = newDirection;
        setDirection(newDirection);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver]);

  useEffect(() => {
    gameRef.current?.focus();
  }, []);

  return (
    <div
      ref={gameRef}
      className="h-full flex flex-col items-center justify-center p-4 font-mono outline-none"
      tabIndex={0}
    >
      {/* Score */}
      <div className="flex justify-between w-full max-w-[320px] mb-4 text-sm">
        <span className="text-text-secondary">
          Score: <span className="text-text-primary">{score}</span>
        </span>
        <span className="text-text-secondary">
          High: <span className="text-text-primary">{highScore}</span>
        </span>
      </div>

      {/* Game Board */}
      <div
        className="relative border border-border bg-bg-secondary"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
          }}
        />

        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`absolute rounded-sm ${
              index === 0 ? 'bg-accent' : 'bg-text-primary'
            }`}
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE - 1,
              height: CELL_SIZE - 1,
            }}
          />
        ))}

        {/* Food */}
        <div
          className="absolute bg-red-500 rounded-full"
          style={{
            left: food.x * CELL_SIZE + 2,
            top: food.y * CELL_SIZE + 2,
            width: CELL_SIZE - 4,
            height: CELL_SIZE - 4,
          }}
        />

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-bg-primary/90 flex flex-col items-center justify-center">
            <span className="text-lg text-text-primary mb-2">Game Over!</span>
            <span className="text-sm text-text-secondary mb-4">Score: {score}</span>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-4 py-2 border border-border hover:bg-bg-elevated transition-colors text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Play Again
            </button>
          </div>
        )}

        {/* Start Overlay */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-bg-primary/80 flex flex-col items-center justify-center">
            <span className="text-sm text-text-secondary mb-4">
              Press SPACE to start
            </span>
            <span className="text-xs text-text-secondary">
              Use arrow keys or WASD to move
            </span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={gameOver}
          className="flex items-center gap-2 px-4 py-2 border border-border hover:bg-bg-elevated transition-colors text-sm disabled:opacity-50"
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Play
            </>
          )}
        </button>
        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-4 py-2 border border-border hover:bg-bg-elevated transition-colors text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
}
