import { useEffect } from 'react';
import io from 'socket.io-client';

const WebSocketComponent = () => {
  useEffect(() => {
    const socket = io('ws://localhost:8001', { transports: ['websocket'] });

    socket.on('connect', () => {
      console.log('Conectado al servidor WebSocket');
      // Enviar el mensaje de suscripción al servidor
      socket.emit('subscribe', { topic: 'example-topic' });
    });

    // Recibir el evento 'subscribed' del servidor
    socket.on('subscribed', (data) => {
      console.log('Respuesta del servidor:', data);
    });

    // Manejar la desconexión
    socket.on('disconnect', () => {
      console.log('Desconectado del servidor WebSocket');
    });

    // Limpiar la conexión cuando el componente se desmonte
    return () => {
      socket.disconnect();
    };
  }, []); // El arreglo vacío asegura que el efecto se ejecute solo una vez al montar el componente
};

export default WebSocketComponent;
