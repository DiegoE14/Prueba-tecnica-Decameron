import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';

const RoomCreate = () => {
  const [hotels, setHotels] = useState([]);
  const [data, setData] = useState({
    room_type: 'Estándar',
    accommodation: 'Sencilla',
    quantity: 1,
    hotel_id: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/hotels')
      .then(res => setHotels(res.data))
      .catch(err => {
        console.error('Error al obtener los hoteles:', err);
        setError('Hubo un problema al cargar los hoteles.');
      });
  }, []);

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/rooms', data)
      .then(() => {
        setSuccess('Habitación creada con éxito.');
        setError(null);

        navigate('/rooms');
      })
      .catch(err => {
        console.error(err);
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Error al crear la habitación.');
        }
        setSuccess(null);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Crear Nueva Habitación</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="hotel_id" className="form-label">Selecciona un Hotel</label>
          <select
            name="hotel_id"
            id="hotel_id"
            className="form-select"
            value={data.hotel_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un hotel</option>
            {hotels.map(hotel => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.name} ({hotel.city})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="room_type" className="form-label">Tipo de Habitación</label>
          <select
            name="room_type"
            id="room_type"
            className="form-select"
            value={data.room_type}
            onChange={handleChange}
            required
          >
            <option value="Estándar">Estándar</option>
            <option value="Junior">Junior</option>
            <option value="Suite">Suite</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="accommodation" className="form-label">Tipo de Alojamiento</label>
          <select
            name="accommodation"
            id="accommodation"
            className="form-select"
            value={data.accommodation}
            onChange={handleChange}
            required
          >
            <option value="Sencilla">Sencilla</option>
            <option value="Doble">Doble</option>
            <option value="Triple">Triple</option>
            <option value="Cuádruple">Cuádruple</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Cantidad</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            className="form-control"
            value={data.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Agregar Habitación</button>
      </form>
    </div>
  );
};

export default RoomCreate;
