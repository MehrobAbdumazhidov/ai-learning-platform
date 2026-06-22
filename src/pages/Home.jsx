import { useState, useMemo } from 'react';
import FilterButtons from '../components/FilterButtons';
import ArticleList from '../components/ArticleList';
import { courses } from '../data/courses';

export default function Home() {
  const [filter, setFilter] = useState('all');
  const [openCommentsId, setOpenCommentsId] = useState(null);

  const filteredCourses = useMemo(() => {
    if (filter === 'all') return courses;
    return courses.filter((course) => course.category === filter);
  }, [filter]);

  const handleToggleComments = (id) => {
    setOpenCommentsId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <section aria-labelledby="welcome-heading">
        <div className="container">
          <h2 id="welcome-heading">Добро пожаловать в AI Learning Platform</h2>
          <p>
            AI Learning Platform — это образовательная платформа, направленная на изучение
            современных технологий: искусственного интеллекта, веб-разработки и цифрового бизнеса.
          </p>
          <p>
            Платформа помогает систематизировать обучение, отслеживать прогресс и получать
            персонализированные рекомендации.
          </p>
        </div>
      </section>

      <section aria-labelledby="courses-heading">
        <div className="container">
          <h2 id="courses-heading">Популярные курсы</h2>

          <FilterButtons active={filter} onChange={setFilter} />

          <ArticleList
            articles={filteredCourses}
            withComments
            openId={openCommentsId}
            onToggleComments={handleToggleComments}
          />
        </div>
      </section>
    </>
  );
}
