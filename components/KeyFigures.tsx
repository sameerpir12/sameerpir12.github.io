
import React, { useEffect, useState } from 'react';

interface KeyFigure {
  name: string;
  role: string;
}

interface KeyFiguresProps {
  figures: KeyFigure[] | null;
  isLoading: boolean;
}

const FigureItem: React.FC<{ figure: KeyFigure }> = ({ figure }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    // Try to fetch image from Wikipedia API
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(figure.name)}&prop=pageimages&format=json&pithumbsize=200&origin=*`
        );
        const data = await response.json();
        const pages = data.query?.pages;
        if (pages) {
          const pageId = Object.keys(pages)[0];
          const source = pages[pageId]?.thumbnail?.source;
          if (source && isMounted) {
            setImageUrl(source);
          }
        }
      } catch (e) {
        // Silently fail to fallback avatar
      }
    };

    if (figure.name) {
      fetchImage();
    }

    return () => {
      isMounted = false;
    };
  }, [figure.name]);

  // Fallback avatar using UI Avatars service
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(figure.name)}&background=random&color=fff&size=128`;

  return (
    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-600">
      <div className="flex-shrink-0">
        <img 
          src={imageUrl || fallbackUrl} 
          alt={figure.name} 
          className="w-10 h-10 rounded-full object-cover border-2 border-slate-200 dark:border-slate-600 shadow-sm"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackUrl;
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
          {figure.name}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
          {figure.role}
        </p>
      </div>
    </div>
  );
};

const FiguresLoader: React.FC = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-center space-x-4 animate-pulse">
        <div className="rounded-full bg-slate-200 dark:bg-slate-600 h-10 w-10"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-3/4"></div>
          <div className="h-3 bg-slate-200 dark:bg-slate-600 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

export const KeyFigures: React.FC<KeyFiguresProps> = ({ figures, isLoading }) => {
  if (!isLoading && (!figures || figures.length === 0)) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-6 transition-colors duration-200 flex flex-col">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-sky-600">
          <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
        </svg>
        Key Figures
      </h3>
      
      {isLoading ? (
        <FiguresLoader />
      ) : (
        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
          {figures?.map((figure, idx) => (
            <FigureItem key={idx} figure={figure} />
          ))}
        </div>
      )}
    </div>
  );
};
