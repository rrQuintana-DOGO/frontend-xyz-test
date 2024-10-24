/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import TripsCollapsibleTable from "./components/TripsCollapsibleTable";
import TripsFilterts from "./components/TripsFilterts";
import NewTripModal from "./components/NewTripModal";
import useGetAllTrips from "../../../logic/hooks/trips/useGetAllTrips";
import CustomBreadcrumbs from "../../../components/CustomBreadcrumbs";
import { CustomButton } from "../../../components/inputs/CustomButton";
import Layout from "../../../containers/Layout";
import CustomTabPanel from "../../../components/CustomTabPanel";
import CustomModal from "../../../components/CustomModal";
import CustomPagination from "../../../components/CustomTablePagination";
import Title from "../../../components/Title";

const TripsPage = () => {
  const [params, setParams] = useState({ page: 1, limit: 10, tab: 'ALL' });
  const { data: trips, isLoading, error } = useGetAllTrips(params);
  const [value, setValue] = useState(0);

  const [newTripModal, setNewTripModal] = useState(false);
  const handleOpen = () => setNewTripModal(true);
  const handleClose = () => setNewTripModal(false);

  const handleChange = (_event: React.SyntheticEvent | null, newValue: number, param?: any) => {
    setValue(newValue);
    if (param) {
      setParams({ ...params, tab: param, page: 1 });
    }
  };

  return (
    <Layout loading={isLoading}>
      <CustomBreadcrumbs
        mainRoute={{ label: 'Inicio', href: '/inicio' }}
        secondaryRoute="Módulo de viajes"
      />
      <div className="flex flex-row w-full justify-between items-center">
        <Title label="Módulo de viajes" size="3xl" />
        <CustomButton label="Nuevo viaje" onClick={handleOpen} />
      </div>
      <Box sx={{ width: '100%', mt: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Todos" onClick={() => handleChange(null, 0, 'ALL')} />
            <Tab label="Alertas" onClick={() => handleChange(null, 1, 'TAL')} />
            <Tab label="Programados" onClick={() => handleChange(null, 2, 'TNS')} />
            <Tab label="En ruta" onClick={() => handleChange(null, 3, 'TOR')} />
            <Tab label="Viajes finalizados" onClick={() => handleChange(null, 4, 'TC')} />
          </Tabs>
        </Box>
        <CustomTabPanel value={0} index={0}>
          {trips && trips?.data && trips?.data.length && !error && (
            <>
              <TripsFilterts />
              <TripsCollapsibleTable trips={trips.data} />
              <CustomPagination
                count={trips.meta.total_pages}
                page={params.page}
                rowsPerPage={params.limit}
                onPageChange={(_event, value) => setParams({ ...params, page: value })}
                onRowsPerPageChange={(event) => setParams({ ...params, page: 1, limit: Number(event.target.value) })}
              />
            </>
          )}
          {error && <p>{error.message === 'timeout of 5000ms exceeded' ? 'Error de conexión' : 'Error al cargar los viajes'}</p>}
          {!trips && !error && <p>No hay viajes disponibles.</p>}
        </CustomTabPanel>
      </Box>

      <CustomModal
        open={newTripModal}
        handleClose={handleClose}
        size="medium"
      >
        <NewTripModal />
      </CustomModal>
    </Layout>
  );
};

export default TripsPage;
