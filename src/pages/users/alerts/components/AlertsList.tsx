import { Alert } from "./Types";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

function parseTimestamp(timestamp: string): Date {
  const time = parseInt(timestamp, 10) * 1000; // Convertir a milisegundos
  return new Date(time);
}

interface AlertsListProps {
  alerts: Alert[];
  selectedAlert: Alert | null;
  onSelectAlert: (alert: Alert) => void;
}

export function AlertsList({ alerts, selectedAlert, onSelectAlert }: AlertsListProps) {
  return (
    <div className="flex overflow-hidden flex-col items-center pt-4 bg-white rounded-none">
      <div className="w-full">
        {alerts?.length === 0 ? (
          <div className="text-gray-500 text-center py-4">
            No hay alertas disponibles.
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id_notification}
              onClick={() => onSelectAlert(alert)}
              className={`flex flex-wrap gap-3 items-start py-3 px-6 w-full cursor-pointer ${
                selectedAlert?.id_notification === alert.id_notification ? "bg-slate-100" : "bg-white"
              }`}
            >
              <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
                <div className="flex gap-10 justify-between items-center w-full">
                  <div className="flex gap-3 items-center self-stretch pb-0.5 my-auto">
                    <div className="self-stretch my-auto text-base font-bold text-sky-600">
                      {alert.trip.id_trip}
                    </div>
                    {alert.active_alerts > 0 && (
                      <div className="self-stretch flex items-center justify-center px-1.5 py-0.5 my-auto w-5 h-5 text-xs font-medium leading-none text-center text-white whitespace-nowrap bg-pinkDogo rounded">
                        {alert.active_alerts}
                      </div>
                    )}
                  </div>
                  <div className="text-xs font-medium leading-none text-right text-gray-500">
                    {formatDistanceToNow(parseTimestamp(alert.alert_time), { addSuffix: true, locale: es })}
                  </div>
                </div>
                <div className="mt-2 text-base font-bold text-zinc-900">
                  {alert.trip.client.name}
                </div>
                <div className="text-sm text-zinc-700">
                  {alert.trip.route.name}
                </div>
                <button className="self-start px-2 py-1 mt-2 text-sm font-medium leading-6 text-sky-700 rounded-lg hover:bg-sky-50">
                  Ver detalles del viaje
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}