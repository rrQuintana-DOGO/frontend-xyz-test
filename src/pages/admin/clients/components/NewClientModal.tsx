import { Divider } from '@mui/material';
import CustomInput from '../../../../components/inputs/CustomInput';
import CustomSelectField from '../../../../components/inputs/CustomSelectField';
import { CustomButton } from '../../../../components/inputs/CustomButton';
import Title from '../../../../components/display/Title';

const NewClientModal = () => {
  return (
    <div className='space-y-6'>
      <Title size='3xl' label='Nuevo usuario' />
      <div className='space-y-6 pe-24'>
        <div className="flex flex-row space-x-5">
          <div className="flex flex-1">
            <CustomInput
              label="Nombre"
              name="name"
              onChange={() => { }}
              value=""
              size='sm'
            />
          </div>
          <div className="flex flex-1">
            <CustomInput
              label="Usuario"
              name="cargo_type"
              onChange={() => { }}
              value=""
              size='sm'
            />
          </div>
        </div>
        <div className="flex flex-row space-x-5">
          <div className="flex flex-1">
            <CustomInput
              label="Correo electrónico"
              name="name"
              onChange={() => { }}
              value=""
              size='sm'
            />
          </div>
          <div className="flex flex-1">
            <CustomInput
              label="Teléfono"
              name="phone_number"
              onChange={() => { }}
              value=""
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
              onChange={() => { }}
              value=""
              options={[
                { value: '1', label: 'Cliente' },
                { value: '2', label: 'Transportista' },
              ]}
              formVariant
            />
          </div>
          <div className="flex flex-1">
            <CustomSelectField
              label="Zona horaria"
              name="time_zone"
              variant='outlined'
              onChange={() => { }}
              value=""
              options={[
                { value: '1', label: 'Hora central (GMT-6)' },
                { value: '2', label: 'Hora del este (GMT-5)' },
                { value: '3', label: 'Hora del pacífico (GMT-7)' },
              ]}
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
          onClick={() => { }}
        />
        <CustomButton
          label='Guardar cambios'
          color='primary'
          onClick={() => { }}
        />
      </div>
    </div>
  );
}

export default NewClientModal;
