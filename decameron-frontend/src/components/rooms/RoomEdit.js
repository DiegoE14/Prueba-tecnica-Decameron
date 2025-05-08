import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../axios';

const RoomEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState({
    room_type: '',
    accommodation: '',
    quantity: 1,
    hotel_id: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    axios.get(`/rooms/${id}`)
      .then(res => {
        setRoom(res.data);
        setFormData({
          room_type: res.data.room_type,
          accommodation: res.data.accommodation,
          quantity: res.data.quantity,
          hotel_id: res.data.hotel.id,
        });
      })
      .catch(err => {
        console.error(err);
        setError('Hubo un problema al cargar los detalles de la habitación.');
      });

    axios.get('/hotels')
      .then(res => setHotels(res.data))
      .catch(err => {
        console.error(err);
        setError('Hubo un problema al cargar los hoteles.');
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/rooms/${id}`, formData)
      .then(() => {
        setSuccess('Los cambios se han guardado correctamente.');
        setError(null);
        navigate(`/rooms`);
      })
      .catch(err => {
        console.error(err);
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Hubo un problema al actualizar los detalles de la habitación.');
        }
        setSuccess(null);
      });
  };

  if (error) {
    return <div className="container mt-5 alert alert-danger">{error}</div>;
  }

  if (success) {
    return <div className="container mt-5 alert alert-success">{success}</div>;
  }

  if (!room) {
    return <div className="container mt-5">Cargando...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Editar Habitación</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Selecciona un Hotel</label>
          <select
            className="form-select"
            name="hotel_id"
            value={formData.hotel_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un hotel</option>
            {hotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.name} ({hotel.city})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo de Habitación</label>
          <select
            className="form-select"
            name="room_type"
            value={formData.room_type}
            onChange={handleChange}
            required
          >
            <option value="Estándar">Estándar</option>
            <option value="Junior">Junior</option>
            <option value="Suite">Suite</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo de Alojamiento</label>
          <select
            className="form-select"
            name="accommodation"
            value={formData.accommodation}
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
          <label className="form-label">Cantidad</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <button type="submit" className="btn btn-success">Guardar Cambios</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate(`/rooms`)}>Cancelar</button>
      </form>
    </div>
  );
};

export default RoomEdit;
