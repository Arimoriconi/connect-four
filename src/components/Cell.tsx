interface Props {
  value: number;
  animate?: boolean;
}

const Cell: React.FC<Props> = ({ value, animate }) => {
  const base = 'w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14  rounded-full border-3 border-black shadow-inner transition-transform';

  const color =
    value === 1
      ? 'bg-pink-400 border-t-8 border-t-[rgba(0,0,0,0.7)]'
      : value === 2
        ? 'bg-yellow-300 border-t-8 border-t-[rgba(0,0,0,0.7)]'
        : 'bg-purple-400 border-t-8 border-t-black';

  return (
    <div className={`${base} ${color} ${animate ? 'animate-drop' : ''}`} />
  );
};

export default Cell;
