/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box, Divider, Tab, Tabs } from '@mui/material';
import { useFormik } from 'formik';
import Title from "../../../../../components/display/Title";
import CustomTabPanel from '../../../../../components/display/CustomTabPanel';
import CustomAccordion from '../../../../../components/display/CustomAccordion';
import useGetAllTripTypes from '../../../../../logic/hooks/trip_types/useGetAllTripTypes';
import Loader from '@components/display/Loader';
import useGetAllJourneyTypes from '../../../../../logic/hooks/journey_types/useGetAllJourneyTypes';
import { useGetAllClients } from '../../../../../logic/hooks/clients/useGetAllClients';
import { CustomButton } from '@components/inputs/CustomButton';
import LogisticForm from './LogisticForm';
import DetailsForm from './DetailsForm';
import { newTripIntialValues, tripValidationSchema } from './tripsFormik';
import CarrierForm from './CarrierForm';
import useGetAllCarriers from '@logic/hooks/carrieres/useGetAllCarrierts';
import useGetAllUnits from '@logic/hooks/units/getAllUnits';
import useGetAllDrivers from '@logic/hooks/drivers/useGetAllDrivers';
import useGetAllRoutes from '@logic/hooks/routes/useGetAllRoutes';
import useGetAllSetponits from '@logic/hooks/setpoints/useGetAllSetpoints';
import useGetAllPhases from '@logic/hooks/phases/useGetAllPhases';
import useGetAllStatus from '@logic/hooks/status/useGetAllStatus';
import { parseNewTrip } from '@utils/transforms/parceNewTrip';
import useCreateTrip from '@logic/hooks/trips/useCreateTrip';
import { showNotification } from '@components/display/Notification';

const NewTripModal = ({handleClose, editing = false, existingTripValues}: {editing?: boolean, existingTripValues?: any, handleClose: () => void}) => {
  const [value, setValue] = React.useState(0);

  const { data: tripTypes, isLoading: isLoadingTripTypes } = useGetAllTripTypes({ limit: -1 });
  const { data: journeyTypes, isLoading: isLoadingJourneyTypes } = useGetAllJourneyTypes({ limit: -1 });
  const { data: clients, isLoading: isLoadingClients } = useGetAllClients({ limit: -1 });
  const { data: carriers, isLoading: isLoadingCarriers } = useGetAllCarriers({ limit: -1 });
  const { data: units, isLoading: isLoadingUnits } = useGetAllUnits({ limit: -1 });
  const { data: drivers, isLoading: isLoadingDrivers } = useGetAllDrivers({ limit: -1 });
  const { data: routes, isLoading: isLoadingRoutes } = useGetAllRoutes({ limit: -1 });
  const { data: setpoints, isLoading: isLoadingSetpoints } = useGetAllSetponits({ limit: -1 });
  const { data: phases, isLoading: isLoadingPhases } = useGetAllPhases({ limit: 1 });
  const { data: status, isLoading: isLoadingStatus } = useGetAllStatus({ limit: 1 });

  const { mutateAsync: createTrip } = useCreateTrip();
  
  
  const formik = useFormik({
    initialValues: !editing ? newTripIntialValues : existingTripValues,
    validationSchema: tripValidationSchema,
    onSubmit: async (values) => {
      try {
        
        values.id_status = status?.data[0].id_status;
        values.id_phase = phases?.data[0].id_phase;

        const formValues = parseNewTrip(values);

        await createTrip(formValues);

        showNotification('Viaje creado', 'Puedes consultar el estatus del viaje y hacer modificaciones', 'success')
        handleClose();
      } catch (error: any) {
        const message = error.response?.data?.message || 'Ocurrió un error al crear el viaje, por favor intenta de nuevo';
        console.error('Error al crear el viaje:', error);
        showNotification('Error al crear el viaje', message, 'error')
      }
    },
  });

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  if (isLoadingTripTypes || isLoadingJourneyTypes || isLoadingClients || isLoadingCarriers || isLoadingUnits || isLoadingDrivers || isLoadingRoutes || isLoadingSetpoints || isLoadingPhases || isLoadingStatus) {
    return <Loader />;
  }

  return (
    <form onSubmit={formik.handleSubmit} className='space-y-3'>
      <Box sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1, paddingInline: 4, paddingTop: 4 }}>
        <Title label="Nuevo viaje" size="2xl" />
        <Box sx={{ borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Creación manual" {...a11yProps(0)} />
            <Tab label="Cargar layout" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Box>
      <Box sx={{ maxHeight: '70vh', overflowY: 'auto', paddingInline: 4 }}>
        <CustomTabPanel value={value} index={0}>
          <CustomAccordion
            title="Detalles"
            defaultOpen
            content={
              <DetailsForm formik={formik} tripTypes={tripTypes} journeyTypes={journeyTypes} clients={clients} routes={routes} />
            }
          />
          <CustomAccordion
            title="Logística"
            content={
              <LogisticForm formik={formik} />
            }
          />
          <CustomAccordion
            title="Asignación"
            content={
              <CarrierForm formik={formik} carriers={carriers} units={units} drivers={drivers} setpoints={setpoints} />
            }
          />
          <Divider />
          <div className="flex justify-end mt-5">
            <CustomButton
              label="Crear viaje"
              color="primary"
              variant="contained"
              size="large"
              onClick={() => {
                formik.handleSubmit()
                console.log('Errores:', formik.errors)
              }}
              sx={{ marginStart: 'auto' }}
            />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
      </Box>
    </form>
  );
}

export default NewTripModal;
