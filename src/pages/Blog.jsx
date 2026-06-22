import { useState, useEffect, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import ArticleList from '../components/ArticleList';

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | success | error
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;

    fetch(`${import.meta.env.BASE_URL}articles.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setArticles(data);
          setStatus('success');
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredArticles = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter((article) =>
      `${article.title} ${article.description}`.toLowerCase().includes(q)
    );
  }, [articles, query]);

  return (
    <section aria-labelledby="blog-heading">
      <div className="container">
        <div className="news-header">
          <h2 id="blog-heading">Свежие новости и статьи</h2>
          <SearchBar value={query} onChange={setQuery} />
        </div>

        {status === 'loading' && <p>Загрузка статей...</p>}
        {status === 'error' && <p>Не удалось загрузить статьи. Попробуйте позже.</p>}
        {status === 'success' && <ArticleList articles={filteredArticles} />}
      </div>
    </section>
  );
}
