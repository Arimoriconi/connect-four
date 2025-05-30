import React from 'react';

type GameMode = 'pvp' | 'cpu';

interface Props {
    selectedMode: GameMode;
    onSelect: (mode: GameMode) => void;
}

const GameModeSelector: React.FC<Props> = ({ selectedMode, onSelect }) => {
    return (
        <div className="flex gap-4">
            <button
                onClick={() => onSelect('pvp')}
                className={`px-4 py-2 rounded-full font-bold border-2 ${selectedMode === 'pvp'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black'
                    }`}
            >
                1 vs 1
            </button>
            <button
                onClick={() => onSelect('cpu')}
                className={`px-4 py-2 rounded-full font-bold border-2 ${selectedMode === 'cpu'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black'
                    }`}
            >
                vs CPU
            </button>
        </div>
    );
};

export default GameModeSelector;
