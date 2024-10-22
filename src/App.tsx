import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from './redux/slices/authSlice';
import Router from './config/Router';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('auth');
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return (
    <Router />
  )
}

export default App
