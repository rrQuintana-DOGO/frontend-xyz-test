import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../logic/redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo_horizontal.png';
import { CustomButton } from '../../components/inputs/CustomButton';
import CustomInput from '../../components/inputs/CustomInput';
import GoogleLogo from '../../assets/images/google_logo.png';
import MicrosoftLogo from '../../assets/images/Microsoft_logo.png';
import loginValidationSchema from '../../utils/validations/loginValidation.schema';
import { useGoogleLogin } from '@react-oauth/google';
import { useFormik } from 'formik';
import ErrorMessage from './components/ErrorMessage';
import Title from '../../components/display/Title';
import { Switch } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'src/logic/redux/store';
import { setOffline } from '../../logic/redux/slices/offlineSlice';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tries, setTries] = React.useState(0);
  const isOffline = useSelector((state: RootState) => state.offline.offline);

  const handleLogin = (values: { username: string; password: string }) => {
    if (values.username === 'admin' && values.password === 'password') {
      dispatch(login(values));
      navigate('/admin/');
    } else if (values.username && values.password) {
      dispatch(login(values));
      navigate('/viajes');
    } else {
      setTries(prevTries => prevTries + 1);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: () => {
      navigate('/viajes');
    },
  });

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: loginValidationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="flex flex-1 min-h-screen w-full">
      <div className="w-3/5 bg-blue-500 min-h-screen"></div>
      <div className="w-2/5 bg-white flex flex-col justify-center p-12 md:p-24">
        <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-6">
          <img src={Logo} alt="Logo Dogo" className="w-40" />
          <Title size="3xl" label="Inicia sesión" />
          <div className="space-y-4 w-full">
            <CustomInput
              name="username"
              label="Usuario"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.username}
              touched={formik.touched.username}
            />
            <CustomInput
              label='Contraseña'
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.password}
              touched={formik.touched.password}
            />
            {
              (formik.errors.username && formik.errors.password) && (
                <ErrorMessage
                  title='Los datos ingresados no son correctos'
                  text={tries < 3 ? 'Verifica que el usuario y contraseña sean correctos.' : 'Verifica que el usuario y contraseña sean correctos. Puedes restablecer tu contraseña. Si el problema continua, contacta al administrador de tu empresa para que pueda darte acceso a la plataforma.'}
                />
              )
            }
          </div>
          <div>
            <CustomButton
              label="Iniciar sesión"
              color="primary"
              variant='contained'
              size='medium'
              onClick={formik.handleSubmit}
            />
          </div>
        </form>

        <p className='text-zinc-500 font-light mt-5'>
          ¿Olvidaste tu contraseña?{' '}
          <span className='text-blue-400 cursor-pointer'>Recuperala aquí.</span>
        </p>

        <div className='space-y-2 mt-5'>
          <p className='text-zinc-500 font-light'>O inicia sesión con tu cuenta empresarial</p>
          <button
            className="border border-zinc-300 space-x-3 flex flex-row items-center py-1 px-3 cursor-pointer hover:bg-slate-100 rounded w-full"
            onClick={() => loginWithGoogle()}
          >
            <img src={GoogleLogo} alt="Google Logo" className="w-5" />
            <p className=''>Ingresa con Google</p>
          </button>
          <div className="border border-zinc-300 space-x-3 flex flex-row items-center py-1 px-3 cursor-pointer hover:bg-slate-100 rounded">
            <img src={MicrosoftLogo} alt="Microsoft Logo" className="w-5" />
            <p className=''>Ingresa con Microsoft</p>
          </div>
        </div>
      </div>
      <div className='mt-auto p-2'>
        <p>Offline</p>
        <Switch
          checked={isOffline}
          onChange={() => dispatch(setOffline(!isOffline))}
        />
      </div>
    </div>
  );
};

export default LoginPage;
