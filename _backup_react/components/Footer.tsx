import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

const Footer: React.FC = () => {
    const t = useTranslations();
  
    return (
      <footer className="border-t border-neutral-800 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-neutral-500 text-sm">
           <pre className="font-code text-neutral-600 text-xs text-center select-none">
{`
          .--.
         |o_o |
         |:_/ |
        //   \\ \\
       (|     | )
      /'\\_   _/ \`\\
      \\___)=(___/
`}
          </pre>
          <p className="font-code text-neutral-600 my-4 tracking-widest">
            //- - - [ EOF ] - - -//
          </p>
          <p>{t('copyright')}</p>
        </div>
      </footer>
    );
  };
  
export default Footer;
