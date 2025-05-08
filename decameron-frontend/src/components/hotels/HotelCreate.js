import React, { useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

const HotelCreate = () => {
  const [data, setData] = useState({
    name: '',
    address: '',
    city: '',
    nit: '',
    room_limit: 1
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/hotels', data)
      .then(() => {
        setSuccess('Hotel creado exitosamente');
        setError(null);
        navigate('/');
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Hubo un problema al crear el hotel');
        }
        setSuccess(null);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Crear Nuevo Hotel</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre del Hotel</label>
          <input
            id="name"
            name="name"
            className="form-control"
            placeholder="Nombre"
            value={data.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Dirección</label>
          <input
            id="address"
            name="address"
            className="form-control"
            placeholder="Dirección"
            value={data.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="city" className="form-label">Ciudad</label>
          <input
            id="city"
            name="city"
            className="form-control"
            placeholder="Ciudad"
            value={data.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nit" className="form-label">NIT</label>
          <input
            id="nit"
            name="nit"
            className="form-control"
            placeholder="NIT"
            value={data.nit}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="room_limit" className="form-label">Límite de Habitaciones</label>
          <input
            id="room_limit"
            name="room_limit"
            type="number"
            className="form-control"
            placeholder="Límite de habitaciones"
            value={data.room_limit}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Crear Hotel</button>
      </form>
    </div>
  );
};

export default HotelCreate;
