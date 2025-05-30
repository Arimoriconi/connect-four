import { Player } from '../../types/inteface';

const TurnIndicator: React.FC<{ currentPlayer: Player }> = ({ currentPlayer }) => (
    <div className="mt-4 bg-pink-400 px-6 py-3 rounded-full border-3 border-black text-white font-bold shadow-[0px_4px_0px_rgba(0,0,0,0.7)]">
        Turno del jugador {currentPlayer}
    </div>
);

export default TurnIndicator;
