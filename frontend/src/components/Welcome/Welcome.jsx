import React from 'react';
import './Welcome.css';

const Welcome = (props) => {
  const background = {
    background: `url(${props.backgroundImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: props.height
  };

  const justifyContentClass = props.titleLoc === 'center' ? 'justify-content-center' : '';

  return (
    <div id="greet-user" style={background} className={`d-flex align-items-center ${justifyContentClass}`}>
      <h1 id="userName">Welcome! {props.user}</h1>
    </div>
  );
};

export default Welcome;
