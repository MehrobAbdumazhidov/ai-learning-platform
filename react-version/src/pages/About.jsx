export default function About() {
  return (
    <>
      <section className="about-section" aria-labelledby="mission-heading">
        <div className="container">
          <div>
            <h2 id="mission-heading">Наша миссия</h2>
            <p>
              Миссия платформы — предоставить доступ к качественному образованию в области
              искусственного интеллекта, программирования и бизнеса.
            </p>
          </div>
          <div>
            <h2 id="audience-heading">Для кого предназначена платформа</h2>
            <ul>
              <li>Студенты технических специальностей</li>
              <li>Начинающие разработчики</li>
              <li>Предприниматели в сфере IT</li>
              <li>Специалисты, желающие повысить квалификацию</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="about-section" aria-labelledby="technologies-heading">
        <div className="container">
          <div>
            <h2 id="technologies-heading">Используемые технологии</h2>
            <ul>
              <li>React (SPA)</li>
              <li>React Router</li>
              <li>Context API</li>
              <li>Git и GitHub</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
