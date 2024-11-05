/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import TripsCollapsibleTable from "./components/TripsCollapsibleTable";
import TripsFilterts from "./components/TripsFilterts";
import NewTripModal from "./components/NewTripModal";
import useGetAllTrips from "../../../logic/hooks/trips/useGetAllTrips";
import CustomTabPanel from "../../../components/display/CustomTabPanel";
import CustomModal from "../../../components/display/CustomModal";
import CustomPagination from "../../../components/display/CustomTablePagination";
import PageContainer from "../../../containers/PageContainer";
import Loader from "../../../components/display/Loader";

const TripsPage = () => {
  const [params, setParams] = useState({ page: 1, limit: 10, tab: 'ALL', search: '', status: '', client: '', carrier: '', place: '' });
  const { data: trips, isLoading, error } = useGetAllTrips(params);
  const [value, setValue] = useState(0);

  const [newTripModal, setNewTripModal] = useState(false);
  const handleOpen = () => setNewTripModal(true);
  const handleClose = () => setNewTripModal(false);

  const handleChange = (_event: React.SyntheticEvent | null, newValue: number, param?: any) => {
    setValue(newValue);
    if (param) {
      setParams({ ...params, tab: param, page: 1, search: '' });
    }
  };

  const handleSearch = async (words: string) => {
    setParams({ ...params, search: words, page: 1 });
  }

  const handleFilter = async (values: any) => {
    const { search, ...rest } = values;
    setParams({ ...params, ...rest, page: 1 });
  }

  return (
    <PageContainer
      title="Módulo de viajes"
      mainRoute={{ label: 'Inicio', href: '/inicio' }}
      secondaryRoute="Módulo de viajes"
      rightButton={{ label: 'Nuevo viaje', action: handleOpen }}
    >
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
        <TripsFilterts params={params} handleSearch={(value: string) => handleSearch(value)} handleFilter={(values: any) => handleFilter(values)} />
        {
          isLoading ?
            <Loader /> :
            <CustomTabPanel value={0} index={0}>
              {trips && trips?.data && trips?.data.length && !error && (
                <>
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
              {error && <p>{error?.message || 'Ocurrió un error inesperado.'}</p>}
              {!trips && !error && <p>No hay viajes disponibles.</p>}
            </CustomTabPanel>
        }
      </Box>

      <CustomModal
        open={newTripModal}
        handleClose={handleClose}
        size="medium"
      >
        <NewTripModal />
      </CustomModal>
    </PageContainer>
  );
};

export default TripsPage;
