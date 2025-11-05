import React, { useState } from 'react';

const PhotoBox: React.FC = () => {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="pixelated-look bg-[#c0c0c0] p-1 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-neutral-700 shadow-lg">
            {/* Title Bar */}
            <div className="flex items-center justify-between bg-[#808080] pl-2 pr-1 h-7 cursor-default">
                <span className="font-display text-white text-base select-none tracking-wide">C:\Users\sk4rz\Picture.jpg</span>
                <div className="flex items-center space-x-1">
                    <button aria-label="Minimize" className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-neutral-700 flex items-center justify-center font-bold text-black text-xs leading-none pb-0.5">_</button>
                    <button aria-label="Maximize" className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-neutral-700 flex items-center justify-center font-bold text-black text-xs leading-none">
                        <span className="w-2 h-2 border border-black block"></span>
                    </button>
                    <button aria-label="Close" className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-neutral-700 flex items-center justify-center font-bold text-black text-xs leading-none pb-0.5">X</button>
                </div>
            </div>
            {/* Content */}
            <div className="p-1 mt-1 border-t-2 border-l-2 border-neutral-700 border-b-2 border-r-2 border-white">
                 <div className="aspect-square border-t border-l border-black border-b border-r border-neutral-600 bg-[#111]">
                     {imageError ? (
                         <div className="text-neutral-500 font-code text-center text-sm select-none p-4 flex flex-col items-center justify-center h-full w-full">
                            <p className="font-bold text-neutral-400 mb-2">[ IMAGE LOAD FAILED ]</p>
                            <p>Ensure the file exists at: <br/><strong className="text-white">/assets/profile.png</strong></p>
                         </div>
                     ) : (
                        <img 
                            src="/assets/profile.png" 
                            alt="A pixelated portrait of sk4rz"
                            className="w-full h-full object-cover pixelated-look" 
                            onError={() => setImageError(true)}
                        />
                     )}
                </div>
            </div>
        </div>
    );
}

export default PhotoBox;
