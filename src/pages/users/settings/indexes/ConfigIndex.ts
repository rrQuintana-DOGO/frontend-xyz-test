
import { 
  ProfilePage,
  SubscriptionPage,
  NotificationPage,
  UsersPage,
  TripsModulePage,
  TemperatureModulePage,
  AlertsModulePage,
  IntegrationsPage,
} from "@pages/users/index"


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