import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import PhotoBox from '../components/PhotoBox';

const About: React.FC = () => {
  const t = useTranslations();

  const SocialLink: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-violet-400 hover:underline transition-colors">
      {children}
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
    </a>
  );
  
  const SectionTitle: React.FC<{children: React.ReactNode}> = ({children}) => (
    <h3 className="font-display text-2xl text-white mb-3">{children}</h3>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <header className="text-left mb-12">
        <h1 className="text-6xl md:text-7xl font-display text-white mb-2">{t('about')}</h1>
        <p className="text-neutral-400">A little more about the person behind the keyboard.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="md:col-span-3 prose prose-invert max-w-none prose-p:text-neutral-300 prose-headings:font-display prose-headings:text-white prose-a:text-violet-400 hover:prose-a:underline prose-ul:pl-5 prose-li:marker:text-violet-500">
          <h2 className="text-4xl !mt-0">{t('about_me')}</h2>
          <p>{t('about_p1')}</p>
          <p>{t('about_p2')}</p>
          <ul>
            <li>{t('topic1')}</li>
            <li>{t('topic2')}</li>
            <li>{t('topic3')}</li>
            <li>{t('topic4')}</li>
          </ul>
          <p>{t('about_p3')}</p>
        </div>
        
        <div className="md:col-span-2 space-y-8">
            <PhotoBox />

            <div>
                <SectionTitle>{t('skills')}</SectionTitle>
                <ul className="space-y-1 text-neutral-400 list-disc list-inside">
                    <li>{t('skill1')}</li>
                    <li>{t('skill2')}</li>
                    <li>{t('skill3')}</li>
                    <li>{t('skill4')}</li>
                    <li>{t('skill5')}</li>
                    <li>{t('skill6')}</li>
                    <li>{t('skill7')}</li>
                </ul>
            </div>
             <div>
                <SectionTitle>{t('interests')}</SectionTitle>
                <ul className="space-y-1 text-neutral-400 list-disc list-inside">
                    <li>{t('interest1')}</li>
                    <li>{t('interest2')}</li>
                    <li>{t('interest3')}</li>
                    <li>{t('interest4')}</li>
                    <li>{t('interest5')}</li>
                    <li>{t('interest6')}</li>
                </ul>
            </div>
             <div>
                <SectionTitle>{t('contact')}</SectionTitle>
                <p className="text-neutral-400 mb-3 text-justify">{t('contact_p')}</p>
                <div className="flex flex-wrap gap-4">
                    <SocialLink href="#">GitHub</SocialLink>
                    <SocialLink href="#">LinkedIn</SocialLink>
                    <SocialLink href="#">Hack The Box</SocialLink>
                    <SocialLink href="#">X</SocialLink>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;