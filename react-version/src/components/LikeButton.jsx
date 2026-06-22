import { useEngagement } from '../context/EngagementContext';

export default function LikeButton({ id }) {
  const { getLikes, likeArticle } = useEngagement();

  return (
    <button className="like-btn" onClick={() => likeArticle(id)}>
      ❤️ <span>{getLikes(id)}</span>
    </button>
  );
}
