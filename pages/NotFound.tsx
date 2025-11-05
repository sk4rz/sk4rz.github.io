import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-display text-white" aria-label="404">
        404
      </h1>
      <p className="font-code text-xl text-violet-400 mt-2">[ERROR: PAGE_NOT_FOUND]</p>
      <p className="text-neutral-400 mt-4 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="mt-8 px-6 py-2 text-base bg-transparent border-2 border-violet-500 text-violet-400 hover:bg-violet-500/10 hover:text-white rounded-md transition-colors font-semibold"
      >
        &gt; return home
      </Link>
    </div>
  );
};

export default NotFound;
