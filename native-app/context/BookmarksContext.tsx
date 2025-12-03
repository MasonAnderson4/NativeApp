import { createContext, useContext, useState, ReactNode } from 'react';

interface Article {
  title: string;
  description: string;
  url: string;
  source: string;
  date: string;
}

interface BookmarksContextType {
  bookmarks: Article[];
  addBookmark: (article: Article) => void;
  removeBookmark: (url: string) => void;
  isBookmarked: (url: string) => boolean;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);

  const addBookmark = (article: Article) => {
    setBookmarks((prev) => [...prev, article]);
  };

  const removeBookmark = (url: string) => {
    setBookmarks((prev) => prev.filter((article) => article.url !== url));
  };

  const isBookmarked = (url: string) => {
    return bookmarks.some((article) => article.url === url);
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarks must be used within BookmarksProvider');
  }
  return context;
}
