'use client';
import React, { useState } from 'react';
import Cell from './Cell';
import { Player, CellData } from '../types/inteface';
import Logo from './Logo';

const ROWS = 6;
const COLS = 7;

const GameBoard: React.FC = () => {
  const [board, setBoard] = useState<CellData[][]>(
    Array(ROWS).fill(null).map(() => Array(COLS).fill({ player: 0 }))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
  const [winner, setWinner] = useState<Player>(0);
  const [hoverCol, setHoverCol] = useState<number | null>(null);

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

        if (checkWin(newBoard.map(r => r.map(c => c.player)), row, col, currentPlayer)) {
          setWinner(currentPlayer);
        } else {
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }
        break;
      }
    }
  };

  const checkWin = (b: Player[][], row: number, col: number, player: Player): boolean => {
    const directions = [
      { dr: 0, dc: 1 },   // Horizontal
      { dr: 1, dc: 0 },   // Vertical
      { dr: 1, dc: 1 },   // Diagonal /
      { dr: 1, dc: -1 },  // Diagonal \
    ];

    for (const { dr, dc } of directions) {
      let count = 1;

      for (let step = 1; step < 4; step++) {
        const r = row + dr * step, c = col + dc * step;
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS || b[r][c] !== player) break;
        count++;
      }

      for (let step = 1; step < 4; step++) {
        const r = row - dr * step, c = col - dc * step;
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS || b[r][c] !== player) break;
        count++;
      }

      if (count >= 4) return true;
    }

    return false;
  };

  const resetGame = () => {
    setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill({ player: 0 })));
    setCurrentPlayer(1);
    setWinner(0);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex flex-row justify-around md:justify-between w-full items-center md:mb-2">
        <Logo />
        {!winner && (
          <button
            className="mt-4 px-5 py-2 bg-black text-white rounded-full hover:brightness-110 transition-all"
            onClick={resetGame}
          >
            Reiniciar
          </button>
        )}
      </div>
      {/* INDICADOR DE COLUMNA */}
      <div className="grid grid-cols-7 gap-4 ">
        {Array.from({ length: COLS }).map((_, colIdx) => (
          <div key={colIdx} className="flex justify-center items-end h-5 w-14">
            {hoverCol === colIdx && (
              <Cell
                value={currentPlayer}
              />
            )}
          </div>
        ))}
      </div>
      {/* TABLERO */}
      <div className="grid grid-cols-7 gap-2 md:gap-4 bg-white p-3 md:p-4 rounded-3xl shadow-[0px_8px_0px_rgba(0,0,0,0.7)] border-3 border-black">
        {/* COLUMNAS */}
        {Array.from({ length: COLS }).map((_, colIdx) => (
          <div
            key={colIdx}
            className="cursor-pointer hover:scale-105 transition-transform gap-2 flex flex-col"
            onClick={() => dropDisc(colIdx)}
            onMouseEnter={() => setHoverCol(colIdx)}
            onMouseLeave={() => setHoverCol(null)}
          >
            {/* FILAS */}
            {Array.from({ length: ROWS }).map((_, rowIdx) => (
              <Cell
                key={rowIdx}
                value={board[rowIdx][colIdx].player}
                animate={board[rowIdx][colIdx].animate}
              />
            ))}
          </div>
        ))}
      </div>
      {/* TEXTO DE GANADOR Y TURNO */}
      {winner ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="pointer-events-auto px-8 w-[400px] h-[300px] flex flex-col items-center justify-center py-4 rounded-3xl border-4 border-black bg-violet-500 text-white font-extrabold text-3xl shadow-[0px_8px_0px_rgba(0,0,0,0.7)] animate-zoom-in-up">
            <Logo />
            <p className='text-4xl mt-5'>¡Jugador {winner} gana!</p>
            <button
              className="mt-4 px-5 py-2 bg-black text-xl text-white rounded-full hover:brightness-110 transition-all"
              onClick={resetGame}
            >
              Reiniciar partida
            </button>
          </div>

        </div>
      ) : (
        <div className="mt-4 bg-pink-400 px-6 py-3 rounded-full border-3 border-black text-white font-bold shadow-[0px_4px_0px_rgba(0,0,0,0.7)]">
          Turno del jugador {currentPlayer}
        </div>
      )}
    </div>
  );
};

export default GameBoard;
