import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/rooms')
      .then(res => {
        setRooms(res.data);
      })
      .catch(err => {
        setError('Hubo un problema al cargar las habitaciones.');
        console.error(err);
      });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta habitación?')) return;

    axios.delete(`/rooms/${id}`)
      .then(() => {
        setRooms(prevRooms => prevRooms.filter(room => room.id !== id));
      })
      .catch(err => {
        setError('Hubo un problema al eliminar la habitación.');
        console.error(err);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Habitaciones Disponibles</h2>

      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <div className="mb-4">
        <button 
          className="btn btn-success"
          onClick={() => navigate('/rooms/create')}
        >
          Crear Habitación
        </button>
      </div>

      <div className="list-group">
        {rooms.length === 0 ? (
          <div className="alert alert-warning" role="alert">
            No hay habitaciones disponibles.
          </div>
        ) : (
          rooms.map(room => (
            <div
              key={room.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">{room.room_type}</h5>
                <small className="text-muted">
                  Alojamiento: {room.accommodation} - Cantidad: {room.quantity}
                  <br />
                  Hotel: {room.hotel.name}
                </small>
              </div>
              <div className="btn-group">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(`/rooms/${room.id}`)}
                >
                  Ver
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => navigate(`/rooms/${room.id}/edit`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(room.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RoomList;
