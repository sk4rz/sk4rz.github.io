import React from 'react';
import { Link } from 'react-router-dom';

interface TagProps {
  name: string;
}

const Tag: React.FC<TagProps> = ({ name }) => {
  return (
    <Link 
      to={`/tags/${name}`} 
      className="text-xs bg-transparent text-neutral-400 px-2 py-1 border border-neutral-700 rounded-full transition-colors hover:bg-violet-500/10 hover:border-violet-500 hover:text-violet-400"
    >
      #{name}
    </Link>
  );
};

export default Tag;