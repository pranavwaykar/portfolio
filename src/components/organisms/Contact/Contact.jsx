import './Contact.scss';

const Contact = () => (
  <section className="contact" id="contact">
    <h2 className="contact__heading">Contacts</h2>
    <form className="contact__form" onSubmit={e => e.preventDefault()}>
      <input className="contact__input" type="text" placeholder="Your Name" required />
      <input className="contact__input" type="email" placeholder="Your Email" required />
      <textarea className="contact__textarea" placeholder="Your Message" required />
      <button className="contact__button" type="submit">Send Message</button>
    </form>
    <div className="contact__info">
      <span>Email: <a href="mailto:your@email.com">your@email.com</a></span>
      <span>LinkedIn: <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">yourprofile</a></span>
    </div>
  </section>
);

export default Contact;
