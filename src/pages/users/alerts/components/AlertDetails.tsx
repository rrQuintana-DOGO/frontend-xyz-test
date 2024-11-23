import { Alert } from "./Types";
import { AlertsTable } from "./AlertsTable";
import { format } from "date-fns";

function parseTimestamp(timestamp: string): Date {
  const time = parseInt(timestamp, 10) * 1000; // Convertir a milisegundos
  return new Date(time);
}

interface AlertDetailsProps {
  alert: Alert | null;
}

export function AlertDetails({ alert }: AlertDetailsProps) {
  if (!alert) {
    return (
      <div className="flex flex-col flex-1 shrink px-10 pt-6 bg-white basis-0 h-[786px] min-w-[240px] max-md:px-5 max-md:max-w-full">
        <div className="text-center text-gray-500">Selecciona una alerta para ver los detalles</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 shrink px-10 pt-6 bg-white basis-0 h-[786px] min-w-[240px] max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col w-full font-bold max-md:max-w-full">
        <div className="w-full text-2xl leading-none text-zinc-900 max-md:max-w-full">
          {alert.trip.client.name}
        </div>
        <div className="text-sky-600">{alert.trip.id_trip}</div>
      </div>
      
      <section className="mt-4" aria-label="Información del operador">
        <h2 className="text-base font-bold mb-4 text-zinc-900">Asignación</h2>
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex-1 min-w-[200px]">
            <div className="font-bold text-zinc-900">Operador</div>
            <div className="text-zinc-700">{alert.trip.drivers[0]?.name}</div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="font-bold text-zinc-900">Teléfono</div>
            <div className="text-zinc-700">{alert.trip.drivers[0]?.phone}</div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="font-bold text-zinc-900">Correo electrónico</div>
            <div className="text-zinc-700">{alert.trip.drivers[0]?.email}</div>
          </div>
        </div>
      </section>

      <section className="mt-4" aria-label="Información del vehículo">
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex-1 min-w-[200px]">
            <div className="font-bold text-zinc-900">Unidad</div>
            <div className="text-zinc-700">{alert.unit.name}</div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="font-bold text-zinc-900">Placa</div>
            <div className="text-zinc-700">{alert.unit.plate}</div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="font-bold text-zinc-900">Línea transportista</div>
            <div className="text-zinc-700">{alert.trip.carrier.name}</div>
          </div>
        </div>
      </section>

      <section className="mt-8" aria-label="Checkpoints del viaje">
        <div className="flex flex-wrap justify-between">
          {alert.trip.places.map((place) => {
            let status = '';

            // Si tiene ambas fechas, se marca como 'completed'
            if (place.real_arrive_date && place.real_estimate_departure_date) {
              status = 'completed';
            }
            // Si solo tiene la fecha de llegada, se marca como 'current'
            else if (place.real_arrive_date) {
              status = 'current';
            }

            return (
              <div key={place.id_place} className="flex flex-col items-center flex-1">
                <div className="flex items-center justify-center w-full">
                  <div className={`h-0.5 flex-1 bg-slate-300`} />
                  <div className={`w-4 h-4 flex items-center justify-center rounded-full border-2 ${
                    status === 'completed' ? 'bg-greenDogo border-greenDogo' :
                    status === 'current' ? 'bg-white border-blueDogo' :
                    'bg-white border-slate-300'
                  }`}>
                    {status === 'completed' && (
                      <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.35962 6.0154L3.36008 6.01585C3.43321 6.08823 3.52912 6.12501 3.62501 6.12501C3.72091 6.12501 3.81682 6.08823 3.88995 6.01585L7.39063 2.51517C7.53664 2.36841 7.53664 2.13161 7.39063 1.98485L7.39017 1.98439C7.24341 1.83838 7.00638 1.83861 6.85962 1.98463L3.62502 5.21971L1.89017 3.48439C1.74341 3.33838 1.50661 3.33838 1.35985 3.48439L1.3594 3.48485C1.21338 3.63161 1.21361 3.86863 1.35962 4.0154L3.35962 6.0154Z" fill="#343741"/>
                      </svg>
                    )}
                  </div>
                  <div className={`h-0.5 flex-1 bg-slate-300`} />
                </div>
                <div className={`mt-2 text-base font-bold ${
                  status === 'current' ? 'text-blueDogo' : 'text-gray-500'
                }`}>
                  {place.name}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-8" aria-label="Ver detalles del viaje">
        <button className="self-start px-2 py-1 mt-2 text-sm font-medium leading-6 text-sky-700 rounded-lg hover:bg-sky-50">
          Ver detalles del viaje
        </button>
      </section>

      <section className="mt-8" aria-label="Alertas activas">
        <h2 className="text-base font-bold mb-4 text-zinc-900">Alertas</h2>
        <AlertsTable alerts={alert.alerts} />
      </section>

      <section className="mt-8" aria-label="Comentarios">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-zinc-900">Comentarios</h2>
          <button className="text-xs text-sky-600 hover:text-sky-700">
            Agregar comentario
          </button>
        </div>
        <div className="space-y-4">
          {alert.trip_logs.map((trip_log, index) => (
            <div key={index} className="border-b border-slate-200 pb-4">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-zinc-900">{trip_log.user.name}</span>
                <span className="text-gray-500">{format(new Date(parseTimestamp(alert.alert_time)), 'dd/MM/yyyy HH:mm:ss')}</span>
              </div>
              <p className="mt-1 text-sm text-zinc-700">{format(new Date(parseTimestamp(alert.alert_time)), 'dd/MM/yyyy HH:mm:ss')}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}