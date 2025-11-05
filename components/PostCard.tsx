import React from 'react';
import { Link } from 'react-router-dom';
import { useLocalization } from '../context/LocalizationContext';
import { Post } from '../types';
import Tag from './Tag';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { language } = useLocalization();

  return (
    <article className="bg-white/5 p-6 border border-white/10 rounded-lg shadow-lg transition-all duration-300 hover:bg-white/10 hover:border-white/20">
      <header>
        <h2 className="text-3xl font-display text-white mb-2">
          <Link to={`/post/${post.slug}`} className="hover:text-violet-400 transition-colors">
            {post.title[language]}
          </Link>
        </h2>
        <p className="text-sm text-neutral-500">{post.date}</p>
      </header>
      <div className="mt-4 text-neutral-300">
        <p className="text-justify">{post.excerpt[language]}</p>
      </div>
      <footer className="mt-6 flex flex-wrap gap-2">
        {post.tags.map(tag => <Tag key={tag} name={tag} />)}
      </footer>
    </article>
  );
};

export default PostCard;