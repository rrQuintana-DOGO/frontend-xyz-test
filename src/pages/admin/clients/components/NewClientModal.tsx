/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../../../../components/inputs/CustomInput';
import CustomSelectField from '../../../../components/inputs/CustomSelectField';
import { CustomButton } from '../../../../components/inputs/CustomButton';
import Title from '../../../../components/display/Title';
import { showNotification } from '@components/display/Notification';
import useGetAllRoles from '@logic/hooks/roles/useGetAllRoles';
import { RoleInteface } from '@logic/interfaces/RoleInterface';
import useGetAllTimeZones from '@logic/hooks/time_zones/useGetAllTimeZones';
import { TimeZoneInterface } from '@logic/interfaces/TimeZonesInterface';
import useCreateUser from '@logic/hooks/users/useCreateUser';

const NewClientModal = () => {
  const { data: roles, isLoading: rolesLoading } = useGetAllRoles({ limit: -1 });
  const { data: timeZones, isLoading: timeZonesLoading } = useGetAllTimeZones({ limit: -1 });
  const { mutateAsync: createUser } = useCreateUser();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      roles: [] as string[],
      id_time_zone: '',
      permissions: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Nombre es requerido'),
      phone: Yup.string(),
      email: Yup.string().email('Correo inválido').required('Correo es requerido'),
      id_time_zone: Yup.string().required('Zona horaria es requerida'),
      roles: Yup.array().of(Yup.string()).required('Rol es requerido').nullable(),
    }),
    onSubmit: async (values) => {
      const rolesA = roles.data.filter((role: RoleInteface) => values.roles.includes(role.id_role));
      const permissions = new Set();
      rolesA.forEach((role: RoleInteface) => role.permissions.forEach((permission) => permissions.add(permission.id_permission)));
      
      formik.setFieldValue('permissions', Array.from(permissions));

      try {
        await createUser(values);
        showNotification('Usuario agregado', 'Puedes consultar el detalle en esta sección', 'success');
      } catch (error: any) {
        showNotification('Error al agregar usuario', error.message, 'error');
      }
      
    },
  });

  if (rolesLoading || timeZonesLoading) return <div>Cargando...</div>;

  return (
    <form onSubmit={formik.handleSubmit} className='space-y-6 p-8'>
      <Title size='3xl' label='Nuevo usuario' />
      <div className='space-y-6'>
        <div className="flex flex-row space-x-5">
          <div className="flex flex-1">
            <CustomInput
              label="Nombre"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              size='sm'
              error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
            />
          </div>
        </div>
        <div className="flex flex-row space-x-5">
          <div className="flex flex-1">
            <CustomInput
              label="Correo electrónico"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              size='sm'
              error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
            />
          </div>
          <div className="flex flex-1">
            <CustomInput
              label="Teléfono"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              size='sm'
              helperText='Opcional'
            />
          </div>
        </div>
        <div className="flex flex-row space-x-5">
          <div className="flex flex-1">
            <CustomSelectField
              label="Rol"
              name="role"
              variant='outlined'
              onChange={(value) => formik.setFieldValue('roles', value)}
              value={formik.values.roles}
              options={roles?.data.map((role: RoleInteface) => ({ value: role.id_role, label: role.name }))}
              error={formik.touched.roles && formik.errors.roles ? (typeof formik.errors.roles === 'string' ? formik.errors.roles : undefined) : undefined}
              formVariant
              multiple
            />
          </div>
          <div className="flex flex-1">
            <CustomSelectField
              label="Zona horaria"
              name="id_time_zone"
              variant='outlined'
              onChange={(value) => formik.setFieldValue('id_time_zone', value)}
              value={formik.values.id_time_zone}
              options={timeZones?.data.map((timeZone: TimeZoneInterface) => ({ value: timeZone.id_time_zone, label: timeZone.name }))}
              error={formik.touched.id_time_zone && formik.errors.id_time_zone ? formik.errors.id_time_zone : undefined}
              formVariant
            />
          </div>
        </div>
      </div>
      <Divider />
      <div className='flex flex-row justify-end space-x-5'>
        <CustomButton
          label='Descartar'
          color='primary'
          variant='text'
          onClick={() => formik.resetForm()}
        />
        <CustomButton
          label='Guardar cambios'
          color='primary'
          onClick={formik.submitForm}
        />
      </div>
    </form>
  );
}

export default NewClientModal;
