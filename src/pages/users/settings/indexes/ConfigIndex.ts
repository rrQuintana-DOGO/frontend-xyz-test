
import ProfilePage from "../ProfilePage"
import SubscriptionPage from "../SubscriptionPage"
import NotificationPage from "../NotificationPage"
import UsersPage from "../UsersPage"
import TripsModulePage from "../TripsModulePage"
import TemperatureModulePage from "../TemperatureModulePage"
import AlertsModulePage from "../AlertsModulePage"
import IntegrationsPage from "../IntegrationsPage"

export const configIndex = [
  {
    parent_name: 'Configuración general',
    childs: [
      {
        name: 'Perfil',
        route: 'perfil',
        component: ProfilePage,
        show: true
      },
      {
        name: 'Subscripción',
        route: 'subscripcion',
        component: SubscriptionPage,
        show: true
      },
      {
        name: 'Notificaciones',
        route: 'notificaciones',
        component: NotificationPage,
        show: true
      },
      {
        name: 'Usuarios',
        route: 'usuarios',
        component: UsersPage,
        show: true
      },
      {
        name: 'Integraciones',
        route: 'integraciones',
        component: IntegrationsPage,
        show: true
      },

    ]
  },
  {
    parent_name: 'Configuración de módulos',
    childs: [
      {
        name: 'Módulo de viajes',
        route: 'viajes',
        component: TripsModulePage,
        show: true
      },
      {
        name: 'Módulo de temperatura',
        route: 'temperatura',
        component: TemperatureModulePage,
        show: true
      },
      {
        name: 'Módulo de alertas',
        route: 'alertas',
        component: AlertsModulePage,
        show: true
      }
    ]
  }
]