// import hsr_logo from './assets/hsr_logo.png'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { socket } from './socket.tsx';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { Events } from "./components/Events";
import { MyForm } from './components/MyForm';

import { NavBar } from './components/Navbar';
import CreateAccount from './pages/CreateAccount';
import LogIn from './pages/LogIn';
import Home from './pages/Home.tsx';
import TablesTEMP from './pages/TablesTEMP.tsx';
import Upload from './pages/Upload.tsx';
import Messages from './pages/Messages.tsx';
import SetReceiver from './pages/SetReceiver.tsx';

function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);

    useEffect(() => {
        function onConnect() {
          setIsConnected(true);
    }

    function onDisconnect() {
        setIsConnected(false);
      }
  
      function onFooEvent(value: any) {
        setFooEvents(previous => [...previous, value]);
      }
  
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('foo', onFooEvent);
  return (
    <>
      <Router>
          <NavBar/>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="Clipr/SignUp" element={<CreateAccount/>} />
              <Route path="Clipr/Tables" element={<TablesTEMP/>} />
              <Route path="Clipr/LogIn" element={<LogIn/>} />
              <Route path="Clipr/Upload" element={<Upload/>} />
              <Route path="Clipr/Messages" element={<Messages/>} />
              <Route path="Clipr/SetReceiver" element={<SetReceiver/>} />
          </Routes>
      </Router>  
    </> 
  )
}

export default App
