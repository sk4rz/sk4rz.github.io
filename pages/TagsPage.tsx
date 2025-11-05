
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { posts } from '../data/posts';
import Tag from '../components/Tag';

const TagsPage: React.FC = () => {
  const t = useTranslations();
  const allTags = [...new Set(posts.flatMap(p => p.tags))].sort();

  return (
    <div className="max-w-3xl mx-auto">
      <header className="text-left mb-12">
        <h1 className="text-6xl md:text-7xl font-display text-white mb-2">{t('tags')}</h1>
        <p className="text-neutral-400">All topics covered in the blog.</p>
      </header>
      <div className="flex flex-wrap gap-4">
        {allTags.map(tag => (
          <div key={tag} className="text-base">
            <Tag name={tag} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsPage;