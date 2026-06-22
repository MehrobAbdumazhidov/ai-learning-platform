import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <>
      <section aria-labelledby="form-heading" className="contact-section">
        <div className="container">
          <h2 id="form-heading">Форма обратной связи</h2>
          <ContactForm />
        </div>
      </section>

      <section aria-labelledby="map-heading" className="contact-section">
        <div className="container">
          <h2 id="map-heading">Наше местоположение</h2>
          <iframe
            src="https://www.google.com/maps?q=Frankfurt&output=embed"
            width="100%"
            height="300"
            allowFullScreen
            loading="lazy"
            title="Карта расположения"
          />
        </div>
      </section>
    </>
  );
}
