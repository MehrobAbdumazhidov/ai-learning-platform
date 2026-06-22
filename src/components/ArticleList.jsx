import Article from './Article';

export default function ArticleList({ articles, withComments = false, openId = null, onToggleComments }) {
  return (
    <div className="article-grid">
      {articles.map((article) => (
        <Article
          key={article.id}
          article={article}
          withComments={withComments}
          isCommentsOpen={openId === article.id}
          onToggleComments={onToggleComments}
        />
      ))}
    </div>
  );
}
