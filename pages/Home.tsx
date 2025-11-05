import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLocalization } from '../context/LocalizationContext';
import { useTranslations } from '../hooks/useTranslations';
import { posts } from '../data/posts';
import PostCard from '../components/PostCard';
import Tag from '../components/Tag';
import Pagination from '../components/Pagination';

const POSTS_PER_PAGE = 3;

const Home: React.FC = () => {
  const t = useTranslations();
  const { language } = useLocalization();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  const currentPage = Number(searchParams.get('page')) || 1;

  const allTags = [...new Set(posts.flatMap(p => p.tags))];

  const filteredPosts = searchQuery
    ? posts.filter(post =>
        post.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;
  
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const Panel: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white/5 p-4 border border-white/10 rounded-lg shadow-lg">
      <h3 className="font-display text-xl text-white mb-4 px-2">{title}</h3>
      <div className="px-2">
        {children}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8" key={searchQuery || 'all-posts'}>
        {searchQuery && (
          <div className="text-neutral-400 mb-4">
            {t('search_results_for')} <span className="text-white">"{searchQuery}"</span>
          </div>
        )}
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map(post => <PostCard key={post.slug} post={post} />)
        ) : (
          <div className="bg-white/5 p-6 border border-white/10 rounded-lg text-center text-neutral-400">
            <p>{t('no_results_found')}</p>
          </div>
        )}
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/" />
      </div>
      <aside className="space-y-8 lg:mt-0">
        <Panel title={t('recently_updated')}>
          <ul className="space-y-3">
            {posts.slice(0, 5).map(post => (
              <li key={post.slug} className="panel-link">
                <Link to={`/post/${post.slug}`} className="text-neutral-300 hover:text-violet-400 transition-colors">
                  <span className="link-text">{post.title[language]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title={t('trending_tags')}>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <Tag key={tag} name={tag} />
            ))}
          </div>
        </Panel>
      </aside>
    </div>
  );
};

export default Home;