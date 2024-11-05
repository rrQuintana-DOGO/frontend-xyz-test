import { useState } from "react"
import CustomModal from "../../../components/display/CustomModal"
import ClientesFilters from "./components/ClientesFilters"
import PageContainer from "../../../containers/PageContainer"
import ClientsCollapsibleTable from "./components/ClientsCollapsibleTable"
import Loader from "../../../components/display/Loader"
import { useGetAllClients_ADMON } from "../../../logic/hooks/clients/useGetAllClients"
import NewClientModal from "./components/NewClientModal"

const ClientsPage = () => {
  const [params, _setParams] = useState({ page: 1, limit: 10 });
  const { data: clients, isLoading, error } = useGetAllClients_ADMON(params);

  const [newClientModal, setNewClientModal] = useState(false);
  const handleOpen = () => setNewClientModal(true);
  const handleClose = () => setNewClientModal(false);

  return (
    <PageContainer
      title="Administración de clientes"
      mainRoute={{ label: 'Inicio', href: '/inicio' }}
      secondaryRoute="Administración de clientes"
      rightButton={{ label: 'Nuevo cliente', action: handleOpen }}
    >
      <ClientesFilters />
      {
        isLoading ? <Loader /> : error ? <p>{error.message}</p> :   <ClientsCollapsibleTable clients={clients} />
      }
      <CustomModal
        open={newClientModal}
        handleClose={handleClose}
        size="large"
      >
        <NewClientModal />
      </CustomModal>
    </PageContainer>
  )
}

export default ClientsPage