import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HotelList from './components/hotels/HotelList';
import HotelCreate from './components/hotels/HotelCreate';
import HotelShow from './components/hotels/HotelShow';
import HotelEdit from './components/hotels/HotelEdit';
import RoomList from './components/rooms/RoomList'; 
import RoomCreate from './components/rooms/RoomCreate';
import RoomShow from './components/rooms/RoomShow';
import RoomEdit from './components/rooms/RoomEdit';

import Navbar from './components/Navbar';
import Footer from './components/Footer';


const App = () => {
  return (
    <Router>
      <Navbar /> 
      <div className="container mt-4">
        <h1 className="mb-4">Gestión de Hoteles</h1>
        <Routes>
          <Route path="/" element={<HotelList />} />
          <Route path="/hotels/create" element={<HotelCreate />} />
          <Route path="/hotels/:id" element={<HotelShow />} />
          <Route path="/hotels/:id/edit" element={<HotelEdit />} />

          <Route path="/rooms" element={<RoomList />} /> 
          <Route path="/rooms/create" element={<RoomCreate />} />
          <Route path="/rooms/:id" element={<RoomShow />} />
          <Route path="/rooms/:id/edit" element={<RoomEdit />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
