import { CellData } from "@/types/inteface";
import { checkWin, COLS, ROWS } from "./gameUtils";

const getAvailableRow = (board: CellData[][], col: number): number => {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col].player === 0) return row;
    }
    return -1;
};

export const getCpuMove = (board: CellData[][]): number => {
    const playerBoard = board.map(row => row.map(cell => cell.player));

    // 1. IA intenta ganar
    for (let col = 0; col < COLS; col++) {
        const row = getAvailableRow(board, col);
        if (row === -1) continue;

        playerBoard[row][col] = 2;
        if (checkWin(playerBoard, row, col, 2)) return col;
        playerBoard[row][col] = 0;
    }

    // 2. Bloquear jugador
    for (let col = 0; col < COLS; col++) {
        const row = getAvailableRow(board, col);
        if (row === -1) continue;

        playerBoard[row][col] = 1;
        if (checkWin(playerBoard, row, col, 1)) return col;
        playerBoard[row][col] = 0;
    }

    // 3. Aleatorio
    const validCols = Array.from({ length: COLS }, (_, col) => col).filter(
        col => board[0][col].player === 0
    );

    return validCols[Math.floor(Math.random() * validCols.length)];
};
