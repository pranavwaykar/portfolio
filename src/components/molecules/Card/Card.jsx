import PropTypes from 'prop-types';
import './Card.scss';

const Card = ({ 
  title, 
  description, 
  image, 
  children, 
  className = '' 
}) => {
  return (
    <div className={`card ${className}`}>
      {image && (
        <div className="card__image">
          <img src={image} alt={title} />
        </div>
      )}
      <div className="card__content">
        {title && <h3 className="card__title">{title}</h3>}
        {description && <p className="card__description">{description}</p>}
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Card; 