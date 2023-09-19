import React from 'react';
import './Home.css';

import img from '../../images/hero_img.png';

export const Home = () => {
  return (
    <>
      <div className="Home__container">
        <h1 className="Home__title">RENT A CAR</h1>
        <h2 className="Home__titleSecond">Rent a car from 30$/day </h2>
        <p className="Home__paragraph">Anywhere and anytime you want</p>
        <p className="Home__paragraph">Extra propositions for VIPs</p>
        <p className="Home__paragraph">Extra insurance included</p>
        <img src={img} alt="hero img" />
      </div>
    </>
  );
};
