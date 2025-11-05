import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { gruvboxDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useLocalization } from '../context/LocalizationContext';
import { posts } from '../data/posts';
import Tag from '../components/Tag';

const PostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLocalization();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const postIndex = posts.findIndex(p => p.slug === slug);
  const post = posts[postIndex];
  const prevPost = posts[postIndex + 1];
  const nextPost = posts[postIndex - 1];


  useEffect(() => {
    if (post) {
      setLoading(true);
      fetch(`/posts/${post.slug}.${language}.md`)
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.text();
        })
        .then(text => {
          setContent(text);
          setLoading(false);
        })
        .catch(error => {
          console.error("Failed to fetch post content:", error);
          setContent("Failed to load post. Please try again later.");
          setLoading(false);
        });
    }
  }, [slug, language, post]);

  if (!post) {
    return <Navigate to="/" />;
  }
  
  const SkeletonLoader: React.FC = () => (
    <div className="space-y-10 animate-pulse">
      <div className="space-y-4">
        <div className="h-8 bg-neutral-800 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-neutral-800 rounded w-1/4 mx-auto"></div>
      </div>
      <div className="space-y-4">
        <div className="h-5 bg-neutral-800 rounded w-full"></div>
        <div className="h-5 bg-neutral-800 rounded w-5/6"></div>
        <div className="h-5 bg-neutral-800 rounded w-full"></div>
        <div className="h-5 bg-neutral-800 rounded w-1/2"></div>
      </div>
      <div className="h-40 bg-neutral-800 rounded"></div>
       <div className="space-y-4">
        <div className="h-5 bg-neutral-800 rounded w-full"></div>
        <div className="h-5 bg-neutral-800 rounded w-3/4"></div>
      </div>
    </div>
  );

  const CodeCopyButton: React.FC<{ code: string }> = ({ code }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <button
        onClick={handleCopy}
        className={`px-2.5 py-1 rounded-md text-xs transition-all duration-200 flex items-center gap-1.5 ${
          copied 
            ? 'bg-green-500/30' 
            : 'bg-neutral-900/60 hover:bg-neutral-700/60'
        }`}
        aria-label="Copy code"
      >
        {copied ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400 animate-pulse"><path d="M20 6 9 17l-5-5"/></svg>
            <span className="text-white">Copied!</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            <span className="text-neutral-300">Copy</span>
          </>
        )}
      </button>
    );
  };
  
  const components = {
    code({node, inline, className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || '');
      const lang = match ? match[1] : 'text';
      const codeString = String(children).replace(/\n$/, '');

      return !inline && match ? (
        <div 
            className="my-6 rounded-md border border-neutral-700 shadow-lg overflow-hidden"
            style={{
                background: 'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.08), transparent 25%), #282828'
            }}
        >
            <div className="flex items-center justify-between px-4 py-1.5 bg-neutral-800/50 border-b border-neutral-700">
                <span className="text-xs font-code text-neutral-400">{lang}</span>
                <div className="flex items-center gap-4">
                  <CodeCopyButton code={codeString} />
                  <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-700"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-600"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-500"></div>
                  </div>
                </div>
            </div>
            <SyntaxHighlighter
              style={gruvboxDark}
              language={lang}
              PreTag="div"
              showLineNumbers
              lineNumberStyle={{ color: '#665c54', fontSize: '0.8em', paddingRight: '1em', userSelect: 'none' }}
              {...props}
              customStyle={{
                margin: 0,
                padding: '1rem',
                backgroundColor: 'transparent',
                fontSize: '0.9em',
              }}
            >
              {codeString}
            </SyntaxHighlighter>
        </div>
      ) : (
        <code className="font-code text-violet-300 bg-white/10 px-1.5 py-0.5 rounded-md" {...props}>
          {children}
        </code>
      )
    }
  };

  return (
    <article className="max-w-3xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-display text-white mb-3">
          {post.title[language]}
        </h1>
        <p className="text-neutral-500 text-base">{post.date}</p>
        <div className="flex justify-center flex-wrap gap-2 mt-6">
          {post.tags.map(tag => <Tag key={tag} name={tag} />)}
        </div>
      </header>
      
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="prose prose-lg lg:prose-xl max-w-none prose-invert
          prose-p:text-neutral-300
          prose-headings:font-display prose-headings:text-white prose-headings:mb-4 prose-headings:mt-8
          prose-h1:text-4xl lg:prose-h1:text-5xl
          prose-h2:text-3xl lg:prose-h2:text-4xl
          prose-h3:text-2xl lg:prose-h3:text-3xl
          prose-h4:text-xl lg:prose-h4:text-2xl
          prose-strong:text-white
          prose-a:text-violet-400 prose-a:font-normal hover:prose-a:underline
          prose-blockquote:border-l-violet-500 prose-blockquote:text-neutral-400 prose-blockquote:font-normal
          prose-code:before:content-[''] prose-code:after:content-['']
          prose-li:marker:text-violet-500
        ">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {content}
          </ReactMarkdown>
        </div>
      )}

      <div className="mt-16 border-t border-neutral-800 pt-8">
        <div className="flex justify-between items-start text-sm">
          <div className="w-1/2 pr-2">
            {prevPost && (
              <Link to={`/post/${prevPost.slug}`} className="block text-left text-neutral-400 hover:text-white transition-colors">
                &larr; Previous Post <br />
                <span className="text-violet-400 font-semibold">{prevPost.title[language]}</span>
              </Link>
            )}
          </div>
          <div className="w-1/2 pl-2">
            {nextPost && (
              <Link to={`/post/${nextPost.slug}`} className="block text-right text-neutral-400 hover:text-white transition-colors">
                Next Post &rarr; <br />
                <span className="text-violet-400 font-semibold">{nextPost.title[language]}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      
       <div className="text-center mt-8">
        <Link to="/archives" className="text-neutral-500 hover:text-violet-400 text-sm transition-colors">
          &laquo; Back to Archives &raquo;
        </Link>
      </div>

    </article>
  );
};

export default PostPage;