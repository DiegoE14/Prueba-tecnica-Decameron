import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../axios';

const HotelEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    nit: '',
    room_limit: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    axios.get(`/hotels/${id}`)
      .then(res => setFormData(res.data))
      .catch(err => {
        console.error(err);
        setError('Hubo un problema al cargar los detalles del hotel.');
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/hotels/${id}`, formData)
      .then(() => {
        setSuccess('Hotel actualizado exitosamente.');
        setError(null);
        navigate('/');
      })
      .catch(err => {
        console.error(err);
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Hubo un problema al actualizar el hotel.');
        }
        setSuccess(null);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Editar Hotel</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Ciudad</label>
          <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">NIT</label>
          <input type="text" className="form-control" name="nit" value={formData.nit} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Límite de habitaciones</label>
          <input type="number" className="form-control" name="room_limit" value={formData.room_limit} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Guardar</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/')}>Cancelar</button>
      </form>
    </div>
  );
};

export default HotelEdit;
