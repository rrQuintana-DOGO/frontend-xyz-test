import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import Logo from '../../assets/images/logo_horizontal.png';
import { CustomButton } from '../../components/inputs/CustomButton';
import CustomInput from '../../components/inputs/CustomInput';
import Title from '../../components/Title';
import GoogleLogo from '../../assets/images/google_logo.png';
import MicrosoftLogo from '../../assets/images/Microsoft_logo.png';
import loginValidationSchema from '../../utils/validations/loginValidation.schema';
import { useGoogleLogin } from '@react-oauth/google';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (values: { username: string; password: string }) => {
    dispatch(login(values));

    if(values.username === 'admin') {
      navigate('/admin/');
    } else {
      navigate('/xyz/');
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: () => {
      navigate('/viajes');
    },
  });

  return (
    <div className="flex flex-1 min-h-screen w-full">
      <div className="w-3/5 bg-blue-500  min-h-screen"></div>
      <div className="w-2/5 bg-white flex flex-col justify-center p-12 md:p-24">
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
              <img src={Logo} alt="Logo Dogo" className="w-40" />
              <Title size="3xl" label="Iniciar sesión" />
              <div className="space-y-4 w-full">
                <CustomInput
                  name="username"
                  label="Usuario"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.username}
                  touched={touched.username}
                />
                <CustomInput
                  name="password"
                  label="Contraseña"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password}
                  touched={touched.password}
                />
              </div>
              <div>
                <CustomButton
                  label="Iniciar sesión"
                  color="primary"
                  variant="solid"
                  size="md"
                  onClick={handleSubmit}
                />
              </div>
            </form>
          )}
        </Formik>

        <p className='text-zinc-500 font-light mt-5'>
          Olvidaste tu contraseña?{' '}
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
    </div>
  );
};

export default LoginPage;
