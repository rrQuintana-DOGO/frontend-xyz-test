import CustomInput from "@components/inputs/CustomInput"
import CustomSelectField from "@components/inputs/CustomSelectField"

/* eslint-disable @typescript-eslint/no-explicit-any */
const DetailsForm = ({ formik, tripTypes, journeyTypes, clients, routes }: { formik: any; tripTypes: any; journeyTypes: any; clients: any, routes: any }) => {
  console
  return (
    <div className="flex flex-col w-full space-y-5">
      {/* Id externo */}
      <div className="w-1/2 pe-3">
        <CustomInput
          label="Id externo"
          name="id_ext"
          onChange={formik.handleChange}
          value={formik.values.id_ext}
          size='sm'
          error={formik.touched.id_ext && formik.errors.id_ext ? formik.errors.id_ext : undefined}
        />
      </div>
      {/* Tipo de viaje & tipo de carga */}
      <div className="flex flex-row space-x-6">
          <CustomSelectField
            label="Tipo de viaje"
            name="id_trip_type"
            variant='outlined'
            onChange={(value) => formik.setFieldValue('id_trip_type', value)}
            value={formik.values.id_trip_type}
            options={tripTypes?.data.map((tripType: any) => ({ value: tripType.id_trip_type, label: tripType.name }))}
            error={formik.touched.id_trip_type && formik.errors.id_trip_type ? formik.errors.id_trip_type : undefined}
            formVariant
          />
          <CustomSelectField
            label="Tipo de carga"
            name="id_journey_type"
            variant='outlined'
            onChange={(value) => formik.setFieldValue('id_journey_type', value)}
            value={formik.values.id_journey_type}
            options={journeyTypes?.data.map((journeyType: any) => ({ value: journeyType.id_journey_type, label: journeyType.name }))}
            error={formik.touched.id_journey_type && formik.errors.id_journey_type ? formik.errors.id_journey_type : undefined}
            formVariant
          />
      </div>
      {/* Cliente */}
      <div className="flex flex-row space-x-6">
        <CustomSelectField
          label="Cliente"
          name="id_client"
          variant='outlined'
          onChange={(value) => formik.setFieldValue('id_client', value)}
          value={formik.values.id_client}
          options={clients?.data.map((client: any) => ({ value: client.id_client, label: client.name }))}
          error={formik.touched.id_client && formik.errors.id_client ? formik.errors.id_client : undefined}
          formVariant
        />
        <CustomSelectField
          label="Ruta"
          name="id_route"
          variant='outlined'
          onChange={(value) => formik.setFieldValue('id_route', value)}
          value={formik.values.id_route}
          options={routes?.data.map((route: any) => ({ value: route.id_route, label: route.name }))}
          error={formik.touched.id_route && formik.errors.id_route ? formik.errors.id_route : undefined}
          formVariant
        />
      </div>
      {/* Carta porte & Operación */}
      <div className="flex flex-row space-x-6">
        <div className="flex flex-1">
          <CustomInput
            label="Carta porte"
            name="carta_porte"
            onChange={formik.handleChange}
            value={formik.values.carta_porte}
            helperText='Opcional'
            size='sm'
          />
        </div>
        <div className="flex flex-1">
          <CustomInput
            label="Operación"
            name="operation"
            onChange={formik.handleChange}
            value={formik.values.operation}
            helperText='Opcional'
            size='sm'
          />
        </div>
      </div>
      {/* Descripción */}
      <div className="w-1/2 pe-3">
        <CustomInput
          label="Descripción del viaje"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          helperText='Opcional'
          size='sm'
        />
      </div>
    </div>
  )
}

export default DetailsForm