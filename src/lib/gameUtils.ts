import { CellData, Player } from "../types/inteface";

export const ROWS = 6;
export const COLS = 7;

export const createEmptyBoard = (): CellData[][] =>
    Array(ROWS)
        .fill(null)
        .map(() => Array(COLS).fill({ player: 0 }));

export const checkWin = (
    b: Player[][],
    row: number,
    col: number,
    player: Player
): boolean => {
    const directions = [
        { dr: 0, dc: 1 },
        { dr: 1, dc: 0 },
        { dr: 1, dc: 1 },
        { dr: 1, dc: -1 },
    ];

    for (const { dr, dc } of directions) {
        let count = 1;

        for (let step = 1; step < 4; step++) {
            const r = row + dr * step;
            const c = col + dc * step;
            if (r < 0 || r >= ROWS || c < 0 || c >= COLS || b[r][c] !== player) break;
            count++;
        }

        for (let step = 1; step < 4; step++) {
            const r = row - dr * step;
            const c = col - dc * step;
            if (r < 0 || r >= ROWS || c < 0 || c >= COLS || b[r][c] !== player) break;
            count++;
        }

        if (count >= 4) return true;
    }

    return false;
};
