import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { envs } from './envs';

const WebSocketComponent = () => {
  const [serverMessage, setServerMessage] = useState('');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io(envs.socketUrl, { transports: ['websocket'] });

    socket.on('connect', () => {
      console.log('Conectado al servidor WebSocket');
      setConnected(true);

      // Enviar el mensaje de suscripción al servidor
      socket.emit('subscribe', { topic: 'example-topic' });
    });

    // Recibir el evento 'subscribed' del servidor
    socket.on('subscribed', (data) => {
      console.log('Respuesta del servidor:', data);
      setServerMessage(data.data);
    });

    // Manejar la desconexión
    socket.on('disconnect', () => {
      console.log('Desconectado del servidor WebSocket');
      setConnected(false);
    });

    // Limpiar la conexión cuando el componente se desmonte
    return () => {
      socket.disconnect();
    };
  }, []); // El arreglo vacío asegura que el efecto se ejecute solo una vez al montar el componente
};

export default WebSocketComponent;
