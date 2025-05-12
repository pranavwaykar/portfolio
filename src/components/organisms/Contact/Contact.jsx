import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Button from '../../atoms/Button/Button';
import './Contact.scss';

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm(
      'service_itgi95p',
      'template_85w3pot',
      form.current,
      'kYbEeym4HTp45szna'
    )
      .then((result) => {
        setSubmitStatus('success');
        form.current.reset();
      })
      .catch((error) => {
        console.error('Error:', error);
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus(null), 5000);
      });
  };

  const handleEmailClick = () => {
    const email = encodeURIComponent("waykarpranav777@gmail.com");
    const subject = encodeURIComponent("Contact from Portfolio");
    const mailtoLink = `mailto:${email}?subject=${subject}`;
    window.location.href = mailtoLink;
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+919762804636";
  };

  const handleLocationClick = () => {
    window.open("https://maps.google.com/?q=Pune,Maharashtra,India", "_blank");
  };

  return (
    <section className="contact" id="contact">
      <h2 className="contact__heading">Contacts</h2>
      <div className="contact__container">
        <div className="contact__info-section">
          <a 
            href="mailto:waykarpranav777@gmail.com" 
            className="contact__info-item"
            style={{ textDecoration: 'none' }}
            onClick={handleEmailClick}
          >
            <div>
              <h3>You can Email Me Here</h3>
              <p>waykarpranav777@gmail.com</p>
            </div>
            <span className="arrow">→</span>
          </a>
          <div className="contact__info-item" onClick={handlePhoneClick}>
            <div>
              <h3>Give Me a Call on</h3>
              <p>+91 97628 04636</p>
            </div>
            <span className="arrow">→</span>
          </div>
          <div className="contact__info-item" onClick={handleLocationClick}>
            <div>
              <h3>Location</h3>
              <p>Pune, Maharashtra, India</p>
            </div>
            <span className="arrow">→</span>
          </div>
        </div>
        
        <form ref={form} className="contact__form" onSubmit={handleSubmit}>
          <input 
            name="from_name"
            className="contact__input" 
            type="text" 
            placeholder="First Name" 
            required 
          />
          <input 
            name="last_name"
            className="contact__input" 
            type="text" 
            placeholder="Last Name" 
            required 
          />
          <input 
            name="from_email"
            className="contact__input" 
            type="email" 
            placeholder="Email" 
            required 
          />
          <input 
            name="phone"
            className="contact__input" 
            type="tel" 
            placeholder="Phone Number" 
            required 
          />
          <select name="reason" className="contact__input full-width">
            <option value="">Why are you contacting us?</option>
            <option value="business">Business</option>
            <option value="job">Job Opportunity</option>
            <option value="learning">Learning & Mentorship</option>
            <option value="other">Other</option>
          </select>
          <textarea 
            name="message"
            className="contact__textarea full-width" 
            placeholder="Your Message here..." 
            required 
          />
          <div className="contact__button-wrapper">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send'}
            </Button>
          </div>
          {submitStatus && (
            <div className={`contact__status contact__status--${submitStatus}`}>
              {submitStatus === 'success' 
                ? 'Message sent successfully!' 
                : 'Message sent successfully!'}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
