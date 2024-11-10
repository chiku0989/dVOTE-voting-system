import './FeatureCard.css'
import { Link } from 'react-router-dom';

const FeatureCard = (props) => {

  const color = {
    backgroundColor : props.color,
    color: 'white'
  }
  return (
      <div id="feature-card" className="card" style={{ width: '18rem' }}>
        <img src={props.img} id="card-img" className="card-img-top" alt="..." />
        <div className="card-body">
        <h5 className="card-title text-center">{props.title}</h5>
          <p className="card-text text-center">
            {props.text}
          </p>
          {props.btn === "true" && <Link onClick={props.function} className='btn' style={color} to={props.link} id="button-open">Open</Link>}
        </div>
      </div>
  );
};

export default FeatureCard;
