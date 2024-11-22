import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { Socket } from 'socket.io-client';

const useSocketConnection = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io(url, { transports: ['websocket'] });

    socketInstance.on('connect', () => {
      console.log('Conectado al servidor WebSocket');
      setConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Desconectado del servidor WebSocket');
      setConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [url]);
  
  return { socket, connected };
};

export default useSocketConnection;
