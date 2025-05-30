import Cell from './Cell';
import { CellData } from '../../types/inteface';

interface ColumnProps {
    columnData: CellData[];
    onClick: () => void;
    onHover: () => void;
    onLeave: () => void;
}

const Column: React.FC<ColumnProps> = ({
    columnData,
    onClick,
    onHover,
    onLeave,
}) => (
    <div
        className="cursor-pointer hover:scale-105 transition-transform gap-2 flex flex-col"
        onClick={onClick}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
    >
        {columnData.map((cell, rowIdx) => (
            <Cell key={rowIdx} value={cell.player} animate={cell.animate} />
        ))}
    </div>
);

export default Column;
