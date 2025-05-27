import React from 'react';
import { Player } from '../types/inteface';

type Props = {
  value: Player;
};

const Cell: React.FC<Props> = ({ value }) => {
  const base = 'w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-3 border-black shadow-inner transition-all duration-300 ';

  const color =
    value === 1
      ? 'bg-pink-400 border-t-8 border-t-[rgba(0,0,0,0.7)]'
      : value === 2
        ? 'bg-yellow-300 border-t-8 border-t-[rgba(0,0,0,0.7)]'
        : 'bg-purple-400 border-t-8 border-t-black';

  return <div className={`${base} ${color}`} ></div>;
};

export default Cell;
