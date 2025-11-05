import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useLocalization } from '../context/LocalizationContext';
import { useTranslations } from '../hooks/useTranslations';
import { posts } from '../data/posts';
import PostCard from '../components/PostCard';

const TagPostsPage: React.FC = () => {
  const { tagName } = useParams<{ tagName: string }>();
  const t = useTranslations();
  const { language } = useLocalization();

  if (!tagName) {
    return <Navigate to="/tags" />;
  }

  const taggedPosts = posts.filter(post => post.tags.includes(tagName));

  return (
    <div className="max-w-5xl mx-auto">
      <header className="text-left mb-12">
        <h1 className="text-4xl md:text-5xl font-display text-white mb-2">
          {t('posts_tagged_with')} <span className="text-violet-400">#{tagName}</span>
        </h1>
      </header>

      <div className="space-y-8">
        {taggedPosts.length > 0 ? (
          taggedPosts.map(post => <PostCard key={post.slug} post={post} />)
        ) : (
          <p className="text-neutral-400">{t('no_posts_found')}</p>
        )}
      </div>
    </div>
  );
};

export default TagPostsPage;