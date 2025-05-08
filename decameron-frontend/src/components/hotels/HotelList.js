import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/hotels')
      .then(res => setHotels(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este hotel?')) return;
    axios.delete(`/hotels/${id}`)
      .then(() => setHotels(hotels.filter(h => h.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Hoteles</h2>

      <div className="mb-4">
        <button 
          className="btn btn-success"
          onClick={() => navigate('/hotels/create')}
        >
          Crear Hotel
        </button>
      </div>

      <div className="list-group">
        {hotels.map(hotel => (
          <div
            key={hotel.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5 className="mb-1">{hotel.name}</h5>
              <small className="text-muted">{hotel.city}</small>
            </div>
            <div className="btn-group">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigate(`/hotels/${hotel.id}`)}
              >
                Ver
              </button>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => navigate(`/hotels/${hotel.id}/edit`)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(hotel.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
