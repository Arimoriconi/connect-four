import { Player } from '../../types/inteface';
import Logo from '../Logo';

interface Props {
    winner: Player;
    onRestart: () => void;
}

const WinnerModal: React.FC<Props> = ({ winner, onRestart }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="pointer-events-auto px-8 w-[400px] h-[300px] flex flex-col items-center justify-center py-4 rounded-3xl border-4 border-black bg-violet-500 text-white font-extrabold text-3xl shadow-[0px_8px_0px_rgba(0,0,0,0.7)] animate-zoom-in-up">
            <Logo />
            <p className="text-4xl mt-5">¡Jugador {winner} gana!</p>
            <button
                className="mt-4 px-5 py-2 bg-black text-xl text-white rounded-full hover:brightness-110 transition-all"
                onClick={onRestart}
            >
                Reiniciar partida
            </button>
        </div>
    </div>
);

export default WinnerModal;
