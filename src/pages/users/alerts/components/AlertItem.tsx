import { Alert } from "./Types";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

function parseTimestamp(timestamp: string): Date {
  const time = parseInt(timestamp, 10) * 1000; // Convertir a milisegundos
  return new Date(time);
}

interface AlertItemProps {
  alert: Alert;
  isSelected: boolean;
  onSelect: () => void;
}

export function AlertItem({ alert, isSelected, onSelect }: AlertItemProps) {
  return (
    <>
      <div
        onClick={onSelect}
        className={`flex flex-wrap gap-3 items-start py-3 pr-6 pl-2 w-full max-w-[540px] cursor-pointer ${
          isSelected ? "bg-slate-100" : "bg-white"
        }`}
      >
        <div className="flex items-start p-1 w-6">
          <img
            loading="lazy"
            src="/icons/alert.svg"
            alt=""
            className="object-contain w-4 aspect-square"
          />
        </div>
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
          <div className="flex gap-10 justify-between items-center w-full">
            <div className="flex gap-3 items-center self-stretch pb-0.5 my-auto">
              <div className="self-stretch my-auto text-base font-bold text-sky-600">
                {alert.trip.id_trip}
              </div>
              {alert.alerts.length > 0 && (
                <div className="self-stretch px-1.5 py-0.5 my-auto w-5 h-5 text-xs font-medium leading-none text-center text-white whitespace-nowrap bg-pink-600 rounded">
                  {formatDistanceToNow(parseTimestamp(alert.alert_time), { addSuffix: true, locale: es })}
                </div>
              )}
            </div>
            <div className="gap-1 self-stretch my-auto text-xs font-medium leading-none text-right text-gray-500">
            {formatDistanceToNow(parseTimestamp(alert.alert_time), { addSuffix: true, locale: es })}
            </div>
          </div>
          <div className="flex items-start pb-0.5 mt-2 text-base font-bold whitespace-nowrap text-zinc-900">
            <div className="flex-1 shrink">{alert.trip.client.name}</div>
          </div>
          <div>
            {alert.trip.route.name}
          </div>
          <button className="gap-2 self-start px-2 py-1 mt-2 text-sm font-medium leading-6 text-sky-700 rounded-lg min-h-[32px] hover:bg-sky-50">
            Ver detalles del viaje
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center self-stretch w-full">
        <div className="flex w-full bg-slate-300 min-h-[1px]" />
      </div>
    </>
  );
}