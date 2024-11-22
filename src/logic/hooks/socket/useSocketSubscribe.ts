/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

const useSocketSubscribe = (socket: any, topic: string) => {
  const [subscribed, setSubscribed] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!socket || !topic) return;

    socket.emit('mqtt-data', { topic });

    socket.on('mqtt-data', (data: any) => {
      console.log('Respuesta del servidor:', data);
      setSubscribed(true);
      setMessage(data.data);
    });

    return () => {
      socket.off('subscribed');
    };
  }, [socket, topic]);

  return { subscribed, message };
};

export default useSocketSubscribe;
