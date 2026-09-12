import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { portfolio } from '../data/portfolio';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('Please complete all fields before sending.');
      return;
    }

    setStatus('Your message has been prepared. Connect the form service to send it from a backend later.');
    setForm({ name: '', email: '', message: '' });
  }

  return (
    <section id="contact" className="content-section">
      <div className="section-shell reveal contact-shell">
        <SectionTitle eyebrow="Contact" title="LET'S BUILD SOMETHING" />

        <div className="contact-grid">
          <div className="contact-info">
            <a href={`mailto:${portfolio.contact.email}`}>{portfolio.contact.email}</a>
            <a href={portfolio.contact.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={portfolio.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label>
              <span>Name</span>
              <input type="text" name="name" value={form.name} onChange={handleChange} />
            </label>

            <label>
              <span>Email</span>
              <input type="email" name="email" value={form.email} onChange={handleChange} />
            </label>

            <label>
              <span>Message</span>
              <textarea name="message" rows="5" value={form.message} onChange={handleChange} />
            </label>

            <button type="submit" className="button primary">SEND MESSAGE</button>
            {status ? <p className="form-status">{status}</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}
