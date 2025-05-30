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

const GameBoard: React.FC = () => {
  const [board, setBoard] = useState<CellData[][]>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
  const [winner, setWinner] = useState<Player>(0);
  const [hoverCol, setHoverCol] = useState<number | null>(null);
  const [gameMode, setGameMode] = useState<'pvp' | 'cpu'>('pvp');

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

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer(1);
    setWinner(0);
  };

  const getAvailableRow = (board: CellData[][], col: number): number => {
    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row][col].player === 0) return row;
    }
    return -1;
  };


  const getBestMove = (board: CellData[][]): number => {
    const playerBoard = board.map(row => row.map(cell => cell.player));

    // 1. Buscar jugada ganadora para la IA (jugador 2)
    for (let col = 0; col < COLS; col++) {
      const row = getAvailableRow(board, col);
      if (row === -1) continue;

      playerBoard[row][col] = 2;
      if (checkWin(playerBoard, row, col, 2)) {
        return col;
      }
      playerBoard[row][col] = 0; // revertir
    }

    // 2. Bloquear jugada ganadora del jugador 1
    for (let col = 0; col < COLS; col++) {
      const row = getAvailableRow(board, col);
      if (row === -1) continue;

      playerBoard[row][col] = 1;
      if (checkWin(playerBoard, row, col, 1)) {
        return col;
      }
      playerBoard[row][col] = 0; // revertir
    }

    // 3. Si no hay peligro ni oportunidad, jugar al azar
    const validCols = Array.from({ length: COLS }, (_, col) => col).filter(
      (col) => board[0][col].player === 0
    );

    return validCols[Math.floor(Math.random() * validCols.length)];
  };


  useEffect(() => {
    if (gameMode === 'cpu' && currentPlayer === 2 && winner === 0) {
      const timeout = setTimeout(() => {
        const bestCol = getBestMove(board);
        dropDisc(bestCol);
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, gameMode, board, winner]);


  return (
    <>
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
                onClick={() => dropDisc(colIdx)}
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
    </>
  );
};

export default GameBoard;
