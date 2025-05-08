import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../axios';

const HotelShow = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    axios.get(`/hotels/${id}`)
      .then(res => setHotel(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!hotel) return <div className="container mt-5">Cargando...</div>;

  return (
    <div className="container mt-5">
      <h2>Detalles del Hotel</h2>
      <ul className="list-group">
        <li className="list-group-item"><strong>Nombre:</strong> {hotel.name}</li>
        <li className="list-group-item"><strong>Dirección:</strong> {hotel.address}</li>
        <li className="list-group-item"><strong>Ciudad:</strong> {hotel.city}</li>
        <li className="list-group-item"><strong>NIT:</strong> {hotel.nit}</li>
        <li className="list-group-item"><strong>Límite de habitaciones:</strong> {hotel.room_limit}</li>
      </ul>
      <Link to="/" className="btn btn-secondary mt-3">Volver</Link>
    </div>
  );
};

export default HotelShow;
