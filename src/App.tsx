import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from './logic/redux/slices/authSlice';
import Router from './containers/navigation/Router';
import useSocketConnection from '@logic/hooks/socket/useSocketConnection';
import useSocketSubscribe from '@logic/hooks/socket/useSocketSubscribe';

function App() {
  const dispatch = useDispatch();
  const { socket } = useSocketConnection('http://localhost:8001');

  const { subscribed, message } = useSocketSubscribe(socket, 'idFlespi');

  useEffect(() => {
    const storedUser = localStorage.getItem('auth');
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (subscribed) {
      console.log('Mensaje recibido:', message);
    }
  }, [subscribed, message]);

  return (
    <Router />
  )
}

export default App
