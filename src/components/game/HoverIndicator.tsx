import Cell from './Cell';
import { Player } from '../../types/inteface';

interface HoverIndicatorProps {
    hoverCol: number | null;
    currentPlayer: Player;
    totalCols: number;
}

const HoverIndicator: React.FC<HoverIndicatorProps> = ({
    hoverCol,
    currentPlayer,
    totalCols,
}) => (
    <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: totalCols }).map((_, colIdx) => (
            <div key={colIdx} className="flex justify-center items-end h-5 w-14">
                {hoverCol === colIdx && <Cell value={currentPlayer} />}
            </div>
        ))}
    </div>
);

export default HoverIndicator;
