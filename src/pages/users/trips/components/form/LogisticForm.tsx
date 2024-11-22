/* eslint-disable @typescript-eslint/no-explicit-any */
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import CustomSelectField from '@components/inputs/CustomSelectField';
import { Button, Checkbox } from '@mui/material';
import CustomDatePicker from '@components/inputs/CustomDatePicker';
import useGetAllPlaces from '@logic/hooks/places/useGetAllPlaces';
import Loader from '@components/display/Loader';
import { useState } from 'react';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const TimeLineCustomItem = ({ title, index, formik }: { title: string; index: number; formik: any }) => {
  const { data: places, isLoading: isLoadingPlaces } = useGetAllPlaces({ limit: -1 });

  if (isLoadingPlaces) {
    return <Loader />;
  }
  
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color="primary"
          sx={{ height: 25, width: 25, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {letters[index]}
        </TimelineDot>
        {index < formik.values.places.length - 1 && (
          <TimelineConnector sx={{ marginTop: '-10px', marginBottom: '-10px', backgroundColor: '#D3DAE6' }} />
        )}
      </TimelineSeparator>
      <TimelineContent>
        <div className="mt-1 space-y-3">
          <p className="font-semibold text-xl">{title}</p>
          <div className="border border-[#D3DAE6] p-4 rounded-lg space-y-5">
            <div className="flex flex-row space-x-4">
              <CustomSelectField
                name={`places[${index}].id_place`}
                label="Ubicación"
                value={formik.values.places[index]?.id_place || ''}
                variant="outlined"
                options={places?.data.map((place: { id_place: string; name: string }) => ({ value: place.id_place, label: place.name }))}
                onChange={(value) => formik.setFieldValue(`places[${index}].id_place`, value)}
                error={formik.touched.places?.[index]?.id_place && formik.errors.places?.[index]?.id_place}
                formVariant
              />
              <CustomSelectField
                name={`places[${index}].action`}
                label="Acción"
                value={formik.values.places[index]?.action || 0}
                variant="outlined"
                options={[
                  { value: 1, label: 'Carga' },
                  { value: 2, label: 'Descarga' },
                ]}
                onChange={(value) => formik.setFieldValue(`places[${index}].action`, value)}
                error={formik.touched.places?.[index]?.action && formik.errors.places?.[index]?.action}
                formVariant
              />
            </div>
            <div className="flex flex-row space-x-4">
              <CustomDatePicker
                label="Entrada"
                value={formik.values.places[index]?.estimate_arrive_date || null}
                onChange={(value) => formik.setFieldValue(`places[${index}].estimate_arrive_date`, value)}
                error={formik.touched.places?.[index]?.estimate_arrive_date && formik.errors.places?.[index]?.estimate_arrive_date}
                formVariant
              />
              <CustomDatePicker
                label="Salida"
                value={formik.values.places[index]?.estimate_departure_date || null}
                onChange={(value) => formik.setFieldValue(`places[${index}].estimate_departure_date`, value)}
                error={formik.touched.places?.[index]?.estimate_departure_date && formik.errors.places?.[index]?.estimate_departure_date}
                formVariant
              />
            </div>
          </div>
        </div>
      </TimelineContent>
    </TimelineItem>
  );
};

export default function LogisticForm({ formik }: { formik: any }) {
  const [returnToOrigin, setReturnToOrigin] = useState(false);

  const addPoint = () => {
    formik.setFieldValue('places', [
      ...formik.values.places,
      { id_place: '', estimate_departure_date: '', estimate_arrive_date: '', action: '' },
    ]);
  };

  const goBackOrigin = () => {
    if (!returnToOrigin) {
      formik.setFieldValue('places', [
        ...formik.values.places,
        { ...formik.values.places[0] },
      ]);
    } else {
      formik.setFieldValue('places', formik.values.places.slice(0, formik.values.places.length - 1));
    }

    setReturnToOrigin(!returnToOrigin);
  }

  return (
    <div>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
          p: 0,
        }}
      >
        {formik.values.places.map((_place: any, index: number) => (
          <TimeLineCustomItem
            key={index}
            title={`Punto ${letters[index]}`}
            index={index}
            formik={formik}
          />
        ))}
      </Timeline>

      <div className="flex flex-row items-center mt-5">
        <div className="flex items-center cursor-pointer">
          <Checkbox checked={returnToOrigin} onChange={goBackOrigin} />
          <p className="text-zinc-500 ml-2">Regresar al punto de origen</p>
        </div>
      </div>

      <Button variant="text" startIcon={<AddCircleOutlineIcon />} onClick={addPoint} sx={{ ml: 2 }}>
        Agregar punto
      </Button>
    </div>
  );
}
