import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import './slider.css'; 

const API_URL = 'http://127.0.0.1:8000';

const Slideshow = () => {
  const [slides, setSlides] = useState([]);
  const [totalSlideshows, setTotalSlideshows] = useState(0);
  const [page, setPage] = useState(1);
  const [slideshowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();
  const [error, setError] = useState(null);
  const authToken = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');

  const fetchSlideshows = async (page, perPage) => {
    try {
        const response = await axios.get(`${API_URL}/api/slideshows`, {
            headers: {
                'Authorization': `Bearer ${authToken}` // Send the token in Authorization header
              },
            params: { page, perPage } // Pass the current page and perPage value to the API
        });

        console.log('Response Data:', response.data); // Log the response to verify the structure

        // Update the slideshows state with the fetched slideshows
        setSlides(response.data.slideshows);
        setTotalSlideshows(response.data.total_slideshows); // Total number of slideshows
    } catch (error) {
        console.error('Error fetching slideshows:', error);
    }
};

useEffect(() => {
  fetchSlideshows(page, slideshowsPerPage);
}, [page, slideshowsPerPage]);

  // if (loading) return <div className="text-center py-5">Loading slideshow...</div>;
  if (error) return <div className="text-center py-5 text-danger">Error: {error}</div>;
  if (slides.length === 0) return <div className="text-center py-5">No slides available</div>;

  return (
    <div className="slideshow-container">
      <Carousel fade indicators={false} controls={slides.length > 1}>
        {slides.map((slide) => (
          <Carousel.Item key={slide.id} interval={5000}> {/* 5 seconds per slide */}
            <div className="slideshow-item">
              <img
                className="d-block w-100"
                src={`${API_URL}/storage/${slide.image}`}
                alt={slide.caption || slide.title}
              />
              {(slide.caption || slide.description) && (
                <Carousel.Caption>
                  {slide.caption && <h3>{slide.caption}</h3>}
                  {slide.description && <p>{slide.description}</p>}
                  {slide.link && <button>Shop Now</button>}
                </Carousel.Caption>
              )}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slideshow;