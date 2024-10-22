import * as Yup from 'yup';

const loginValidationSchema = Yup.object({
  username: Yup.string().required('Usuario es requerido'),
  password: Yup.string().required('Contraseña es requerida'),
});

export default loginValidationSchema;