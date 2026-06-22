import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const EngagementContext = createContext(null);

const LIKES_KEY = 'engagement_likes';
const COMMENTS_KEY = 'engagement_comments';

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function EngagementProvider({ children }) {
  // { [articleId]: number }
  const [likes, setLikes] = useState(() => loadJSON(LIKES_KEY, {}));
  // { [articleId]: string[] }
  const [comments, setComments] = useState(() => loadJSON(COMMENTS_KEY, {}));

  useEffect(() => {
    localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
  }, [likes]);

  useEffect(() => {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
  }, [comments]);

  const likeArticle = useCallback((id) => {
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }, []);

  const addComment = useCallback((id, text) => {
    setComments((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), text],
    }));
  }, []);

  const getLikes = useCallback((id) => likes[id] || 0, [likes]);
  const getComments = useCallback((id) => comments[id] || [], [comments]);

  const value = { likeArticle, addComment, getLikes, getComments };

  return (
    <EngagementContext.Provider value={value}>
      {children}
    </EngagementContext.Provider>
  );
}

export function useEngagement() {
  const ctx = useContext(EngagementContext);
  if (!ctx) {
    throw new Error('useEngagement должен использоваться внутри <EngagementProvider>');
  }
  return ctx;
}
