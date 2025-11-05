import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLocalization } from '../context/LocalizationContext';
import { useTranslations } from '../hooks/useTranslations';
import { posts } from '../data/posts';
import Pagination from '../components/Pagination';

const POSTS_PER_PAGE = 10;

const ArchivesPage: React.FC = () => {
  const t = useTranslations();
  const { language } = useLocalization();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  // Chronological sort (newest first)
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = sortedPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <div className="max-w-3xl mx-auto">
      <header className="text-left mb-12">
        <h1 className="text-6xl md:text-7xl font-display text-white mb-2">{t('archives')}</h1>
        <p className="text-neutral-400">A full chronological list of all posts.</p>
      </header>
      <div className="space-y-8">
        <section>
          <ul className="space-y-4">
            {paginatedPosts.map(post => (
              <li key={post.slug} className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="text-neutral-500 text-sm mr-4 w-28 shrink-0">{post.date}</span>
                <Link to={`/post/${post.slug}`} className="text-neutral-200 hover:text-violet-400 transition-colors">
                  {post.title[language]}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/archives" />
      </div>
    </div>
  );
};

export default ArchivesPage;