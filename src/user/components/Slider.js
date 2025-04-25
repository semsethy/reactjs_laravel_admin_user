import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './slider.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_URL = 'http://127.0.0.1:8000';

const Slideshow = () => {
  const [slides, setSlides] = useState([]);
  const [page, setPage] = useState(1);
  const [slideshowsPerPage] = useState(10);
  const [error, setError] = useState(null);

  const authToken = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');

  const fetchSlideshows = async (page, perPage) => {
    try {
      const response = await axios.get(`${API_URL}/api/slideshows`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        params: { page, perPage }
      });

      setSlides(response.data.slideshows);
    } catch (error) {
      setError('Failed to load slides.');
      console.error('Error fetching slideshows:', error);
    }
  };

  useEffect(() => {
    fetchSlideshows(page, slideshowsPerPage);
  }, [page, slideshowsPerPage]);

  if (error) return <div className="text-center py-5 text-danger">{error}</div>;
  if (slides.length === 0) return <div className="text-center py-5">No slides available</div>;

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-arrow next-arrow" onClick={onClick}>
        ❯
      </div>
    );
  };
  
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-arrow prev-arrow" onClick={onClick}>
        ❮
      </div>
    );
  };
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  };

  return (
    <section className="section-slide">
      <div className="wrap-slick1">
        <Slider {...settings} className="slick1">
          {slides.map((slide) => (
            <div key={slide.id} className="item-slick1">
            <img
              src={`${API_URL}/storage/${slide.image}`}
              alt={slide.caption || slide.title}
            />
            <div className="container1">
              <div className="flex-col-l-m ">
                {slide.caption && (
                  <div className="layer-slick1 animated fadeInDown">
                    <span className="ltext-101 cl2 respon2">{slide.caption}</span>
                  </div>
                )}
                {slide.title && (
                  <div className="layer-slick1 animated fadeInUp">
                    <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">{slide.title}</h2>
                  </div>
                )}
                {slide.description && (
                  <div className="layer-slick1 animated fadeInDown pb-4">
                    <span className="ltext-101 cl2 respon2">{slide.description}</span>
                  </div>
                )}
                {slide.link && (
                  <div className="layer-slick1 animated zoomIn">
                    <a
                      href={slide.link}
                      className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                    >
                      Shop Now
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Slideshow;


