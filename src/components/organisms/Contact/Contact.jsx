import Button from '../../atoms/Button/Button';
import './Contact.scss';

const Contact = () => {
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
        
        <form className="contact__form" onSubmit={e => e.preventDefault()}>
          <input 
            className="contact__input" 
            type="text" 
            placeholder="First Name" 
            required 
          />
          <input 
            className="contact__input" 
            type="text" 
            placeholder="Last Name" 
            required 
          />
          <input 
            className="contact__input" 
            type="email" 
            placeholder="Email" 
            required 
          />
          <input 
            className="contact__input" 
            type="tel" 
            placeholder="Phone Number" 
            required 
          />
          <select className="contact__input full-width">
            <option value="">Why are you contacting us?</option>
            <option value="business">Business</option>
            <option value="project">Project</option>
            <option value="other">Other</option>
          </select>
          <textarea 
            className="contact__textarea full-width" 
            placeholder="Your Message here..." 
            required 
          />
          <div className="contact__button-wrapper">
            <Button type="submit">Send</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
