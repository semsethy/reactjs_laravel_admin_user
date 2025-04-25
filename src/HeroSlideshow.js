import React, { useState, useEffect } from 'react';
import './HeroSlideshow.css';

const images = [
  './user/images/slider-bg.jpg',
  '/user/images/slider-bg.jpg',
  '../user/images/slider-bg.jpg',
];

const HeroSlideshow = () => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % length);
    }, 5000); // change slide every 5 seconds

    return () => clearInterval(interval); // cleanup
  }, [length]);

  return (
    <div className="hero-container">
      {images.map((img, index) => (
        <div
          className={`slide ${index === current ? 'active' : ''}`}
          key={index}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
    </div>
  );
};

export default HeroSlideshow;
