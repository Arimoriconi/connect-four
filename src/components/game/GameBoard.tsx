'use client';
import React, { useEffect, useState } from 'react';
import Column from './Column';
import HoverIndicator from './HoverIndicator';
import TurnIndicator from './TurnIndicator';
import WinnerModal from './WinnerModal';
import Logo from '../Logo';
import { CellData, Player } from '../../types/inteface';
import { checkWin, createEmptyBoard, ROWS, COLS } from '../../lib/gameUtils';
import GameModeSelector from './GameModeSelector';
import { getCpuMove } from '@/lib/cpuUtils';

const GameBoard: React.FC = () => {
  const [board, setBoard] = useState<CellData[][]>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
  const [winner, setWinner] = useState<Player>(0);
  const [hoverCol, setHoverCol] = useState<number | null>(null);
  const [gameMode, setGameMode] = useState<'pvp' | 'cpu'>('pvp');

  // Lógica para soltar ficha
  const dropDisc = (col: number) => {
    if (winner) return;

    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    for (let row = ROWS - 1; row >= 0; row--) {
      if (newBoard[row][col].player === 0) {
        newBoard[row][col] = { player: currentPlayer, animate: true };
        setBoard(newBoard);

        setTimeout(() => {
          newBoard[row][col].animate = false;
          setBoard([...newBoard]);
        }, 300);

        const win = checkWin(newBoard.map(r => r.map(c => c.player)), row, col, currentPlayer);
        if (win) {
          setWinner(currentPlayer);
        } else {
          setCurrentPlayer(prev => (prev === 1 ? 2 : 1));
        }
        break;
      }
    }
  };

  // Reset
  const resetGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer(1);
    setWinner(0);
  };

  // Movimiento de la CPU
  useEffect(() => {
    if (gameMode === 'cpu' && currentPlayer === 2 && winner === 0) {
      const timeout = setTimeout(() => {
        const bestCol = getCpuMove(board);
        dropDisc(bestCol);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, gameMode, board, winner]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex flex-row justify-around md:justify-between w-full items-center md:mb-2">
        <Logo />
        <GameModeSelector selectedMode={gameMode} onSelect={setGameMode} />
        {!winner && (
          <button
            className="px-5 py-2 bg-black text-white rounded-full hover:brightness-110 transition-all"
            onClick={resetGame}
          >
            Reiniciar
          </button>
        )}
      </div>

      <HoverIndicator hoverCol={hoverCol} currentPlayer={currentPlayer} totalCols={COLS} />

      <div className="grid grid-cols-7 gap-2 md:gap-4 bg-white p-3 md:p-4 rounded-3xl shadow-[0px_8px_0px_rgba(0,0,0,0.7)] border-3 border-black">
        {Array.from({ length: COLS }).map((_, colIdx) => {
          const column = board.map(row => row[colIdx]);
          return (
            <Column
              key={colIdx}
              columnData={column}
              onClick={() => {
                if (gameMode === 'cpu' && currentPlayer === 2) return; // 🛑 Bloqueo CPU
                dropDisc(colIdx);
              }}
              onHover={() => setHoverCol(colIdx)}
              onLeave={() => setHoverCol(null)}
            />
          );
        })}
      </div>

      {winner ? (
        <WinnerModal winner={winner} onRestart={resetGame} />
      ) : (
        <TurnIndicator currentPlayer={currentPlayer} />
      )}
    </div>
  );
};

export default GameBoard;