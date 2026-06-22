import LikeButton from './LikeButton';
import Comments from './Comments';

export default function Article({ article, withComments, isCommentsOpen, onToggleComments }) {
  const { id, title, description, meta } = article;

  return (
    <article className="article-card" data-id={id}>
      <div className="card-content">
        <h3>{title}</h3>
        {meta && <small>{meta}</small>}
        <p>{description}</p>
      </div>

      <div className="card-footer">
        <LikeButton id={id} />
      </div>

      {withComments && (
        <>
          <button className="toggle-comments-btn" onClick={() => onToggleComments(id)}>
            {isCommentsOpen ? '✖ Закрыть' : '💬 Комментарии'}
          </button>
          <Comments id={id} isOpen={isCommentsOpen} />
        </>
      )}
    </article>
  );
}
