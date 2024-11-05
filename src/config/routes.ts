import ConfigPage from "@pages/users/settings/ConfigPage"
import ClientsPage from "@pages/admin/clients/ClientsPage"
import AdminHomePage from "@pages/admin/home/AdminHomePage"
import TripsPage from "@pages/users/trips/TripsPage"

export const userRoutes = [
  {
    name: 'Módulo de viajes',
    route: '',
    component: TripsPage,
    show: true,
  },
  {
    name: 'Configuración',
    route: 'configuracion/*',
    component: ConfigPage,
    show: true,
  }
]
export const adminRoutes = [
  {
    name: 'Módulo admon',
    route: '',
    component: AdminHomePage,
    show: true
  },
  {
    name: 'Administración de clientes',
    route: 'clientes',
    component: ClientsPage,
    show: true
  },
]