/* eslint-disable @typescript-eslint/no-explicit-any */
import Title from "@components/display/Title";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CustomSelectField from "@components/inputs/CustomSelectField";
import { FormikProps } from "formik";
import { newTripValues } from "./tripsFormik";

interface Carrier {
  id_carrier: string;
  name: string;
}

interface Unit {
  id_unit: string;
  name: string;
}

interface Driver {
  id_driver: string;
  name: string;
}

interface CarrierFormProps {
  formik: FormikProps<newTripValues>;
  carriers: { data: Carrier[] };
  units: { data: Unit[] };
  drivers: { data: Driver[] };
  setpoints: { data: any[] };
}

const CarrierForm: React.FC<CarrierFormProps> = ({ formik, carriers, units, drivers, setpoints }) => {
  const addDriver = () => {
    formik.setValues({
      ...formik.values,
      drivers: [
        ...formik.values.drivers,
        '',
      ],
    });
  };

  const addUnit = () => {
    formik.setValues({
      ...formik.values,
      units: [
        ...formik.values.units,
        {
          id_unit: '',
          id_setpoint: '',
        },
      ],
    });
  };

  return (
    <div>

      <div className="w-1/2">
        <CustomSelectField
          label="Seleccionar transportista"
          name="id_carrier"
          variant="outlined"
          onChange={(value) => formik.setFieldValue('id_carrier', value)}
          value={formik.values.id_carrier}
          options={carriers.data.map((carrier) => ({
            value: carrier.id_carrier,
            label: carrier.name,
          }))}
          error={formik.touched.id_carrier ? formik.errors.id_carrier : undefined}
          formVariant
        />
      </div>

      <div className="mt-8 space-y-5">
        <Title label="Unidades" size="xl" />
        {formik.values.units.map((_, index) => (
          <div key={index} className="flex flex-row space-x-4">
            <CustomSelectField
              label="Seleccionar unidad"
              name={`units[${index}].id_unit`}
              variant="outlined"
              onChange={(value) => formik.setFieldValue(`units[${index}].id_unit`, value)}
              value={formik.values.units[index]?.id_unit || ''}
              options={units.data
                .map((unit) => ({ value: unit.id_unit, label: unit.name }))}
              error={formik.touched.units?.[index]?.id_unit ? (formik.errors.units?.[index] as any)?.id_unit : undefined}
              formVariant
            />
            <CustomSelectField
              label="Seleccionar setpoint"
              name={`units[${index}].id_setpoint`}
              variant="outlined"
              onChange={(value) => formik.setFieldValue(`units[${index}].id_setpoint`, value)}
              value={formik.values.units[index]?.id_setpoint || ''}
              options={setpoints.data
                .map((setpoint) => ({ value: setpoint.id_setpoint, label: setpoint.name }))}
              error={formik.touched.units?.[index]?.id_setpoint ? (formik.errors.units?.[index] as any)?.id_setpoint : undefined}
              formVariant
            />
          </div>
        ))}
        <Button variant="text" startIcon={<AddCircleOutlineIcon />} onClick={addUnit}>
          Agregar unidad
        </Button>
      </div>

      <div className="w-1/2">
        <div className="mt-8 space-y-5">
          <Title label="Operadores" size="xl" />
          {formik.values.drivers.map((_, index) => (
            <div key={index} className="flex flex-row space-x-4">
              <CustomSelectField
                label="Seleccionar operador"
                name={`drivers[${index}]`}
                variant="outlined"
                onChange={(value) => formik.setFieldValue(`drivers[${index}]`, value)}
                value={formik.values.drivers[index] || ''}
                options={drivers.data
                  .map((driver) => ({ value: driver.id_driver, label: driver.name }))}
                error={formik.errors.drivers?.[index] ? (formik.errors.drivers as any)?.[index] : ''}
                formVariant
              />
            </div>
          ))}
          <Button variant="text" startIcon={<AddCircleOutlineIcon />} onClick={addDriver}>
            Agregar operador
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarrierForm;
