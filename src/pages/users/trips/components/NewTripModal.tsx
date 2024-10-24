import React from 'react';
import Title from '../../../../components/Title';
import { Box, Tab, Tabs } from '@mui/material';
import CustomTabPanel from '../../../../components/CustomTabPanel';
import CustomAccordion from '../../../../components/CustomAccordion';
import CustomInput from '../../../../components/inputs/CustomInput';

const NewTripModal = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className='space-y-3'>
      <Box sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
        <Title label="Nuevo viaje" size="2xl" />
        <Box sx={{ borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Creación manual" {...a11yProps(0)} />
            <Tab label="Cargar layout" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Box>
      <Box sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <CustomTabPanel value={value} index={0}>
          <CustomAccordion
            title="Detalles"
            defaultOpen
            content={
              <div className="flex flex-col w-full space-y-5">
                <div className="w-1/2">
                  <CustomInput
                    label="Id externo"
                    name="external_id"
                    onChange={() => { }}
                    value=""
                    helperText='Opcional'
                    size='sm'
                  />
                </div>
                <div className="flex flex-row space-x-5">
                  <div className="flex flex-1">
                    <CustomInput
                      label="Tipo de viaje"
                      name="trip_type"
                      onChange={() => { }}
                      value=""
                      size='sm'
                    />
                  </div>
                  <div className="flex flex-1">
                    <CustomInput
                      label="Tipo de carga"
                      name="cargo_type"
                      onChange={() => { }}
                      value=""
                      size='sm'
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <CustomInput
                    label="Cliente"
                    name="client"
                    onChange={() => { }}
                    value=""
                    size='sm'
                  />
                </div>
                <div className="flex flex-row space-x-5">
                  <div className="flex flex-1">
                    <CustomInput
                      label="Carta porte"
                      name="carta_porte"
                      onChange={() => { }}
                      value=""
                      helperText='Opcional'
                      size='sm'
                    />
                  </div>
                  <div className="flex flex-1">
                    <CustomInput
                      label="Operación"
                      name="operation"
                      onChange={() => { }}
                      value=""
                      helperText='Opcional'
                      size='sm'
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <CustomInput
                    label="Descripción del viaje"
                    name="description"
                    onChange={() => { }}
                    value=""
                    helperText='Opcional'
                    size='sm'
                  />
                </div>
              </div>
            }
          />
          <CustomAccordion
            title="Logística"
            content={
              <div className="flex flex-col w-full space-y-5">
                <div className="w-1/2">
                  <CustomInput
                    label="Id externo"
                    name="external_id_2"
                    onChange={() => { }}
                    value=""
                    helperText='Opcional'
                    size='sm'
                  />
                </div>
                <div className="flex flex-row space-x-5">
                  <div className="flex flex-1">
                    <CustomInput
                      label="Tipo de viaje"
                      name="trip_type_2"
                      onChange={() => { }}
                      value=""
                      size='sm'
                    />
                  </div>
                  <div className="flex flex-1">
                    <CustomInput
                      label="Tipo de carga"
                      name="cargo_type_2"
                      onChange={() => { }}
                      value=""
                      size='sm'
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <CustomInput
                    label="Cliente"
                    name="client_2"
                    onChange={() => { }}
                    value=""
                    size='sm'
                  />
                </div>
                <div className="flex flex-row space-x-5">
                  <div className="flex flex-1">
                    <CustomInput
                      label="Carta porte"
                      name="carta_porte_2"
                      onChange={() => { }}
                      value=""
                      helperText='Opcional'
                      size='sm'
                    />
                  </div>
                  <div className="flex flex-1">
                    <CustomInput
                      label="Operación"
                      name="operation_2"
                      onChange={() => { }}
                      value=""
                      helperText='Opcional'
                      size='sm'
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <CustomInput
                    label="Descripción del viaje"
                    name="description_2"
                    onChange={() => { }}
                    value=""
                    helperText='Opcional'
                    size='sm'
                  />
                </div>
              </div>
            }
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
      </Box>
    </div>
  );
}

export default NewTripModal;
