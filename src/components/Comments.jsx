import { useState } from 'react';
import { useEngagement } from '../context/EngagementContext';

export default function Comments({ id, isOpen }) {
  const { getComments, addComment } = useEngagement();
  const [text, setText] = useState('');
  const comments = getComments(id);

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addComment(id, trimmed);
    setText('');
  };

  return (
    <div className={`comments${isOpen ? '' : ' hidden'}`}>
      <div className="comments-header">
        <strong>Комментарии</strong>
      </div>

      <div className="comments-form">
        <input
          type="text"
          className="comment-input"
          placeholder="Написать комментарий..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button className="comment-btn" onClick={handleAdd}>
          Добавить
        </button>
      </div>

      <ul className="comment-list">
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
}
