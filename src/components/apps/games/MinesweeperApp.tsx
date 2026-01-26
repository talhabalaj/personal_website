import { useState, useCallback, useEffect } from 'react';
import { Flag, Bomb, RotateCcw, Smile, Frown, Glasses } from 'lucide-react';

const GRID_WIDTH = 9;
const GRID_HEIGHT = 9;
const MINE_COUNT = 10;

type CellState = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

type GameState = 'playing' | 'won' | 'lost';

export function MinesweeperApp() {
  const [grid, setGrid] = useState<CellState[][]>([]);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [flagCount, setFlagCount] = useState(0);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const initializeGrid = useCallback((firstClickX?: number, firstClickY?: number) => {
    // Create empty grid
    const newGrid: CellState[][] = Array(GRID_HEIGHT)
      .fill(null)
      .map(() =>
        Array(GRID_WIDTH)
          .fill(null)
          .map(() => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            adjacentMines: 0,
          }))
      );

    // Place mines (avoiding first click area)
    let minesPlaced = 0;
    while (minesPlaced < MINE_COUNT) {
      const x = Math.floor(Math.random() * GRID_WIDTH);
      const y = Math.floor(Math.random() * GRID_HEIGHT);

      // Avoid placing mine on or adjacent to first click
      if (firstClickX !== undefined && firstClickY !== undefined) {
        const dx = Math.abs(x - firstClickX);
        const dy = Math.abs(y - firstClickY);
        if (dx <= 1 && dy <= 1) continue;
      }

      if (!newGrid[y][x].isMine) {
        newGrid[y][x].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate adjacent mines
    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        if (newGrid[y][x].isMine) continue;

        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy;
            const nx = x + dx;
            if (
              ny >= 0 &&
              ny < GRID_HEIGHT &&
              nx >= 0 &&
              nx < GRID_WIDTH &&
              newGrid[ny][nx].isMine
            ) {
              count++;
            }
          }
        }
        newGrid[y][x].adjacentMines = count;
      }
    }

    return newGrid;
  }, []);

  const resetGame = useCallback(() => {
    setGrid(initializeGrid());
    setGameState('playing');
    setFlagCount(0);
    setIsFirstClick(true);
    setTimer(0);
    setIsTimerRunning(false);
  }, [initializeGrid]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setTimer((t) => Math.min(t + 1, 999));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const revealCell = useCallback(
    (x: number, y: number, currentGrid: CellState[][]) => {
      if (
        x < 0 ||
        x >= GRID_WIDTH ||
        y < 0 ||
        y >= GRID_HEIGHT ||
        currentGrid[y][x].isRevealed ||
        currentGrid[y][x].isFlagged
      ) {
        return currentGrid;
      }

      const newGrid = currentGrid.map((row) => row.map((cell) => ({ ...cell })));
      newGrid[y][x].isRevealed = true;

      // If empty cell, reveal neighbors
      if (!newGrid[y][x].isMine && newGrid[y][x].adjacentMines === 0) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const result = revealCell(x + dx, y + dy, newGrid);
            for (let i = 0; i < GRID_HEIGHT; i++) {
              for (let j = 0; j < GRID_WIDTH; j++) {
                newGrid[i][j] = result[i][j];
              }
            }
          }
        }
      }

      return newGrid;
    },
    []
  );

  const handleCellClick = useCallback(
    (x: number, y: number) => {
      if (gameState !== 'playing' || grid[y][x].isFlagged) return;

      let currentGrid = grid;

      // First click - initialize grid avoiding this cell
      if (isFirstClick) {
        currentGrid = initializeGrid(x, y);
        setIsFirstClick(false);
        setIsTimerRunning(true);
      }

      if (currentGrid[y][x].isMine) {
        // Game over - reveal all mines
        const newGrid = currentGrid.map((row) =>
          row.map((cell) => ({
            ...cell,
            isRevealed: cell.isMine ? true : cell.isRevealed,
          }))
        );
        setGrid(newGrid);
        setGameState('lost');
        setIsTimerRunning(false);
        return;
      }

      const newGrid = revealCell(x, y, currentGrid);
      setGrid(newGrid);

      // Check win condition
      const allNonMinesRevealed = newGrid.every((row) =>
        row.every((cell) => cell.isMine || cell.isRevealed)
      );

      if (allNonMinesRevealed) {
        setGameState('won');
        setIsTimerRunning(false);
      }
    },
    [grid, gameState, isFirstClick, initializeGrid, revealCell]
  );

  const handleRightClick = useCallback(
    (e: React.MouseEvent, x: number, y: number) => {
      e.preventDefault();
      if (gameState !== 'playing' || grid[y][x].isRevealed) return;

      setGrid((prev) => {
        const newGrid = prev.map((row) => row.map((cell) => ({ ...cell })));
        const cell = newGrid[y][x];
        cell.isFlagged = !cell.isFlagged;
        setFlagCount((f) => (cell.isFlagged ? f + 1 : f - 1));
        return newGrid;
      });
    },
    [grid, gameState]
  );

  const getNumberColor = (num: number) => {
    const colors = [
      '',
      'text-blue-400',
      'text-green-400',
      'text-red-400',
      'text-purple-400',
      'text-yellow-400',
      'text-cyan-400',
      'text-pink-400',
      'text-gray-400',
    ];
    return colors[num] || '';
  };

  const FaceIcon = gameState === 'won' ? Glasses : gameState === 'lost' ? Frown : Smile;

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-fit mb-4 gap-4">
        <div className="flex items-center gap-1 px-2 py-1 bg-bg-secondary border border-border min-w-[60px]">
          <Flag className="w-3 h-3 text-red-400" />
          <span className="text-text-primary text-sm">
            {String(MINE_COUNT - flagCount).padStart(3, '0')}
          </span>
        </div>

        <button
          onClick={resetGame}
          className="p-2 bg-bg-secondary border border-border hover:bg-bg-elevated transition-colors"
        >
          <FaceIcon className="w-5 h-5 text-text-primary" />
        </button>

        <div className="flex items-center gap-1 px-2 py-1 bg-bg-secondary border border-border min-w-[60px]">
          <span className="text-text-primary text-sm">
            {String(timer).padStart(3, '0')}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="border border-border bg-bg-secondary p-1">
        {grid.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => (
              <button
                key={`${x}-${y}`}
                className={`w-6 h-6 flex items-center justify-center text-xs font-bold border border-border transition-colors ${
                  cell.isRevealed
                    ? cell.isMine
                      ? 'bg-red-500/20'
                      : 'bg-bg-primary'
                    : 'bg-bg-elevated hover:bg-bg-secondary'
                }`}
                onClick={() => handleCellClick(x, y)}
                onContextMenu={(e) => handleRightClick(e, x, y)}
                disabled={gameState !== 'playing'}
              >
                {cell.isRevealed ? (
                  cell.isMine ? (
                    <Bomb className="w-3 h-3 text-text-primary" />
                  ) : cell.adjacentMines > 0 ? (
                    <span className={getNumberColor(cell.adjacentMines)}>
                      {cell.adjacentMines}
                    </span>
                  ) : null
                ) : cell.isFlagged ? (
                  <Flag className="w-3 h-3 text-red-400" />
                ) : null}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Game Status */}
      {gameState !== 'playing' && (
        <div className="mt-4 text-center">
          <p className="text-sm text-text-primary mb-2">
            {gameState === 'won' ? 'Congratulations! You won!' : 'Game Over!'}
          </p>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 border border-border hover:bg-bg-elevated transition-colors text-sm mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </button>
        </div>
      )}

      {/* Instructions */}
      <p className="mt-4 text-xs text-text-secondary">
        Left click to reveal • Right click to flag
      </p>
    </div>
  );
}
