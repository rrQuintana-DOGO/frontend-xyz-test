/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import useGetAllStatus from "../../../../logic/hooks/status/useGetAllStatus";
import CustomMenuButton from "../../../../components/inputs/CustomMenuButton";
import CustomSelectField from "../../../../components/inputs/CustomSelectField";
import { CustomButton } from "../../../../components/inputs/CustomButton";
import useGetAllPlaces from "../../../../logic/hooks/places/useGetAllPlaces";
import useGetAllCarriers from "../../../../logic/hooks/carrieres/useGetAllCarrierts";
import { useGetAllClients } from "../../../../logic/hooks/clients/useGetAllClients";

const TripsFilters = ({ params, handleSearch, handleFilter }: any) => {
  const { data: statusData, isLoading: isLoadingStatus } = useGetAllStatus({ limit: -1, page: 1 });
  const { data: clientsData, isLoading: isLoadingClients } = useGetAllClients({ limit: -1, page: 1 });
  const { data: carriersData, isLoading: isLoadingCarriers } = useGetAllCarriers({ limit: -1, page: 1 });
  const { data: placesData, isLoading: isLoadingPlaces } = useGetAllPlaces({ limit: -1, page: 1 });

  const formik = useFormik({
    initialValues: { search: '', status: '', client: '', carrier: '', place: '' },
    onSubmit: (values) => {
      handleFilter(values);
    },
  });

  if (isLoadingStatus || isLoadingClients || isLoadingCarriers || isLoadingPlaces) {
    return (
      <div className="flex flex-row flex-1 py-3 space-x-2 w-1/2 ms-auto">
        <div className="w-full bg-white border border-zinc-200 px-3 py-1 rounded-md flex flex-row space-x-3 group items-center">
          <span className="text-black">
            <i className="fa-solid fa-magnifying-glass text-zinc-400 text-sm" />
          </span>
          <input
            type="text"
            name="search"
            value={params.search}
            onChange={(e) => handleSearch(e.target.value)}
            onBlur={formik.handleBlur}
            className="bg-transparent w-full text-black focus:outline-none text-sm"
            placeholder='Buscar'
          />
        </div>
        <CustomButton label="Filtros" color="secondary" variant="outlined" disabled />
      </div>
    )
  }

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-row flex-1 py-3 space-x-2 w-1/2 ms-auto">
      <div className="w-full bg-white border border-zinc-200 px-3 py-1 rounded-md flex flex-row space-x-3 group items-center">
        <span className="text-black">
          <i className="fa-solid fa-magnifying-glass text-zinc-400 text-sm" />
        </span>
        <input
          type="text"
          name="search"
          value={params.search}
          onChange={(e) => handleSearch(e.target.value)}
          onBlur={formik.handleBlur}
          className="bg-transparent w-full text-black focus:outline-none text-sm"
          placeholder='Buscar'
        />
      </div>

      <CustomMenuButton
        label="Filtrar"
        color="secondary"
        variant="outlined"
        sx={{
          backgroundColor: 'rgb(255, 255, 255)',
          border: '1px solid rgb(229, 231, 235)',
        }}>
        <div className="px-5 py-3 space-y-5">
          <CustomSelectField
            label="Estatus"
            name="status"
            variant="outlined"
            value={formik.values.status}
            onChange={(value) => formik.setFieldValue("status", value)}
            options={statusData?.data?.map((status: any) => ({
              value: status.id_status,
              label: status.name,
            })) || []} // Proveer un array vacío si no hay datos
            error={formik.errors.status}
            touched={formik.touched.status}
            size="medium"
          />
          <CustomSelectField
            label="Cliente"
            name="client"
            variant="outlined"
            value={formik.values.client}
            onChange={(value) => formik.setFieldValue("client", value)}
            options={clientsData?.data?.map((client: any) => ({
              value: client.id_client,
              label: client.name,
            })) || []}
            error={formik.errors.client}
            touched={formik.touched.client}
            size="medium"
          />
          <CustomSelectField
            label="Transportista"
            name="carrier"
            variant="outlined"
            value={formik.values.carrier}
            onChange={(value) => formik.setFieldValue("carrier", value)}
            options={carriersData?.data?.map((carrier: any) => ({
              value: carrier.id_carrier,
              label: carrier.name,
            })) || []}
            error={formik.errors.carrier}
            touched={formik.touched.carrier}
            size="medium"
          />
          <CustomSelectField
            label="Lugar"
            name="place"
            variant="outlined"
            value={formik.values.place}
            onChange={(value) => formik.setFieldValue("place", value)}
            options={placesData?.data?.map((place: any) => ({
              value: place.id_place,
              label: place.name,
            })) || []}
            error={formik.errors.place}
            touched={formik.touched.place}
            size="medium"
          />
          <div className="flex flex-row space-x-12">
            <CustomButton
              label="Limpiar"
              color="secondary"
              variant="text"
              size="medium"
              onClick={() => {
                formik.resetForm();
                handleSearch('');
              }}
            />
            <CustomButton
              label="Aplicar"
              color="primary"
              variant="contained"
              size="medium"
              onClick={formik.handleSubmit}
            />
          </div>
        </div>
      </CustomMenuButton>
    </form>
  );
};

export default TripsFilters;
