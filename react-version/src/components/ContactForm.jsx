import { useState } from 'react';

const NAME_REGEX = /^[A-Za-zА-Яа-яЁё\s-]{3,}$/;
const EMAIL_REGEX = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;

const initialValues = { name: '', email: '', phone: '', message: '' };

function validate(values) {
  const errors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = 'Пожалуйста, введите ФИО';
  } else if (!NAME_REGEX.test(name)) {
    errors.name = 'ФИО должно содержать только буквы, пробелы или дефис (минимум 3 символа)';
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = 'Введите email';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Введите корректный email (например, name@domain.com)';
  }

  const phone = values.phone.trim();
  if (phone) {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) {
      errors.phone = 'Введите телефон: от 10 до 15 цифр, можно с +, пробелами, скобками';
    }
  }

  const message = values.message.trim();
  if (!message) {
    errors.message = 'Сообщение не может быть пустым';
  } else if (message.length < 10) {
    errors.message = 'Сообщение должно содержать не менее 10 символов';
  }

  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    if (touched) {
      setErrors(validate(nextValues));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched(true);

    if (Object.keys(validationErrors).length === 0) {
      alert('Спасибо! Форма отправлена (демо-режим).');
      setValues(initialValues);
      setErrors({});
      setTouched(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="name">ФИО:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          className={errors.name ? 'invalid' : ''}
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
      </div>

      <div>
        <label htmlFor="email">Электронная почта:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className={errors.email ? 'invalid' : ''}
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>

      <div>
        <label htmlFor="phone">Телефон:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Например: 1234567890"
          value={values.phone}
          onChange={handleChange}
          className={errors.phone ? 'invalid' : ''}
        />
        {errors.phone && <div className="error-message">{errors.phone}</div>}
      </div>

      <div>
        <label htmlFor="message">Сообщение:</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={values.message}
          onChange={handleChange}
          className={errors.message ? 'invalid' : ''}
        />
        {errors.message && <div className="error-message">{errors.message}</div>}
      </div>

      <button type="submit">Отправить</button>
    </form>
  );
}
