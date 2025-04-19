import React, { useState, useEffect } from 'react';
import axios from 'axios';
import placeholder from '../images/logos/placeholder2.jpg';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:8000';

const SlideshowList = () => {
  const [slideshows, setSlideshows] = useState([]);
  const [totalSlideshows, setTotalSlideshows] = useState(0);
  const [page, setPage] = useState(1);
  const [slideshowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
        setSlideshows(response.data.slideshows);
        setTotalSlideshows(response.data.total_slideshows); // Total number of slideshows
    } catch (error) {
        console.error('Error fetching slideshows:', error);
    }
};

useEffect(() => {
  fetchSlideshows(page, slideshowsPerPage);
}, [page, slideshowsPerPage]);

const handleDelete = async (slideshow) => {
  let response;
  try{
      response = await axios.delete(`${API_URL}/api/slideshows/${slideshow.id}`, {headers:{Authorization: `Bearer ${authToken}`}});
      console.log('slideshow deleted successfully:', response.data);
      fetchSlideshows(page, slideshowsPerPage);
  } catch(error){
    console.log(error);
  }
};
const handleEdit = (slideshow) => {
  navigate('/admin/slideshow_add', {
      state: { slideshowData: slideshow }
  });
};

  const totalPages = Math.ceil(totalSlideshows / slideshowsPerPage);

  return (
    <div className="container-fluid">
      <h1>Slideshow List</h1>
      <div className="mb-4" style={{ textAlign: 'right' }}>
        <button
            onClick={() => navigate('/admin/slideshow_add')}
            style={{
                backgroundColor: '#28a745',
                color: 'white',
                borderRadius: '4px',
                padding: '8px 12px',
                border: 'none',
                cursor: 'pointer',
            }}
        >
            + New
        </button>
      </div>

      <div className="table-container">
        <div className="card p-3">
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr>
                  <th><strong>ID</strong></th>
                  <th><strong>Title</strong></th>
                  <th><strong>Image</strong></th>
                  <th><strong>Category</strong></th>
                  <th><strong>Caption</strong></th>
                  <th><strong>Description</strong></th>
                  <th><strong>Status</strong></th>
                  <th><strong>Action</strong></th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {slideshows.length > 0 ? slideshows.map((row) => {
                  const statusColor = row.status === 1 ? { color: 'rgb(3, 232, 95)' } : { color: 'rgb(172, 8, 17)' };
                  const statusText = row.status === 1 ? 'Active' : 'Inactive';
                  const categoryTitle = row.category?.title || 'Unknown Category';

                  return (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.title}</td>
                      <td>
                        <img src={API_URL+"/storage/"+row.image || placeholder} alt="Slideshow Image" className="product-img" style={{ width: '100px', height: '50px', objectFit: 'cover', borderRadius: '5px', boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)' }} />
                      </td>
                      <td>{categoryTitle}</td>
                      <td>{row.caption}</td>
                      <td>{row.description}</td>
                      <td><span style={statusColor}>{statusText}</span></td>
                      <td>
                        <div className="dropdown">
                          <button type="button" className="btn dropdown-toggle hide-arrow d-flex align-items-center justify-content-center" data-bs-toggle="dropdown">
                            <i className="bx bx-dots-vertical-rounded p-0"></i>
                          </button>
                          <div className="dropdown-menu">
                            <button className="dropdown-item" onClick={() => handleEdit(row)}>
                              <i className="bx bx-edit-alt me-1"></i> Edit
                            </button>
                            <button className="dropdown-item" onClick={() => handleDelete(row)} style={{ color: 'red' }}>
                              <i className="bx bx-trash me-1"></i> Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr><td colSpan="8" className="text-center">No slideshows found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <nav aria-label="Slideshow Pagination">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setPage(page - 1)} aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              {[...Array(totalPages).keys()].map(i => (
                <li key={i} className={`page-item ${i + 1 === page ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${page >= totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setPage(page + 1)} aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SlideshowList;
