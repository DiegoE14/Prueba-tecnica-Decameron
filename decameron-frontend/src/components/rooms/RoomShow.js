import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../axios';

const RoomShow = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/rooms/${id}`)
      .then(res => setRoom(res.data))
      .catch(err => {
        console.error(err);
        setError('Hubo un problema al cargar los detalles de la habitación.');
      });
  }, [id]);

  if (error) {
    return <div className="container mt-5 alert alert-danger">{error}</div>;
  }

  if (!room) {
    return <div className="container mt-5">Cargando...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Detalles de la Habitación</h2>
      <ul className="list-group">
        <li className="list-group-item"><strong>Tipo de habitación:</strong> {room.room_type}</li>
        <li className="list-group-item"><strong>Alojamiento:</strong> {room.accommodation}</li>
        <li className="list-group-item"><strong>Cantidad:</strong> {room.quantity}</li>
        <li className="list-group-item"><strong>Hotel:</strong> {room.hotel?.name || 'Sin nombre'}</li>
      </ul>
      <Link to="/rooms" className="btn btn-secondary mt-3">Volver</Link>
    </div>
  );
};

export default RoomShow;
