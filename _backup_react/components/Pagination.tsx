import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, basePath }) => {
  const [searchParams] = useSearchParams();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    // Ensure basePath doesn't have a trailing slash, and params has a starting '?'
    const finalBasePath = basePath === '/' ? '' : basePath;
    return `${finalBasePath}/?${params.toString()}`;
  };

  if (totalPages <= 1) {
    return null;
  }

  const pagesToShow = new Set<number>();
  pagesToShow.add(1);
  pagesToShow.add(totalPages);
  if (currentPage > 1) pagesToShow.add(currentPage - 1);
  pagesToShow.add(currentPage);
  if (currentPage < totalPages) pagesToShow.add(currentPage + 1);
  
  const sortedPages = Array.from(pagesToShow).sort((a,b) => a-b).filter(p => p > 0 && p <= totalPages);
  
  const pageLinks: React.ReactNode[] = [];
  let lastPage = 0;
  for (const page of sortedPages) {
    if (lastPage > 0 && page > lastPage + 1) {
      pageLinks.push(<span key={`ellipsis-${lastPage}`} className="px-4 py-2 text-neutral-500">...</span>);
    }
    pageLinks.push(
      <Link
        key={page}
        to={createPageUrl(page)}
        className={`px-4 py-2 border border-neutral-700 rounded-md transition-colors text-sm ${
          currentPage === page
            ? 'bg-violet-500/20 border-violet-500 text-white'
            : 'bg-transparent text-neutral-400 hover:bg-neutral-800 hover:border-neutral-600'
        }`}
      >
        {page}
      </Link>
    );
    lastPage = page;
  }

  return (
    <nav className="flex justify-center items-center gap-2 mt-12">
      {currentPage > 1 && (
        <Link
          to={createPageUrl(currentPage - 1)}
          className="px-4 py-2 border border-neutral-700 rounded-md transition-colors text-sm bg-transparent text-neutral-400 hover:bg-neutral-800 hover:border-neutral-600"
        >
          &larr; Prev
        </Link>
      )}

      {pageLinks}

      {currentPage < totalPages && (
        <Link
          to={createPageUrl(currentPage + 1)}
          className="px-4 py-2 border border-neutral-700 rounded-md transition-colors text-sm bg-transparent text-neutral-400 hover:bg-neutral-800 hover:border-neutral-600"
        >
          Next &rarr;
        </Link>
      )}
    </nav>
  );
};

export default Pagination;