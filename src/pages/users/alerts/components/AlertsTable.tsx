import * as React from 'react';

interface Alert {
  id_notification: string;
  name: string;
}

export interface AlertsProps {
  alerts: Alert[];
}

export const AlertsTable: React.FC<AlertsProps> = ({ alerts }) => {
  return (
    <section className="flex flex-col justify-center" role="region" aria-label="Alerts Table">
      <div className="w-full" role="table">
        <div className="flex border-b border-slate-300" role="row">
          <div className="w-16 py-3 px-4">
            <div className="flex items-center justify-center" role="columnheader">
              <span className="sr-only">Select</span>
            </div>
          </div>
          <div className="w-2/4 py-3 px-4">
            <div className="text-xs font-semibold text-black" role="columnheader">
              ID
            </div>
          </div>
          <div className="flex-1 min-w-[240px] py-3 px-4">
            <div className="text-xs font-semibold text-black" role="columnheader">
              Alerta
            </div>
          </div>
          <div className="w-[107px] py-3 px-4">
            <div className="text-xs font-semibold text-black text-center" role="columnheader">
              Acción
            </div>
          </div>
        </div>

        {alerts.map((alert) => (
          <div key={alert.id_notification} className="flex items-center border-b border-slate-300" role="row">
            <div className="w-16 py-3 px-4">
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-stone-300 rounded focus:ring-2 focus:ring-sky-500"
                  aria-label={`Select alert ${alert.id_notification}`}
                />
              </div>
            </div>
            <div className="w-2/4 py-3 px-4 text-sm">
              {alert.id_notification}
            </div>
            <div className="flex-1 min-w-[240px] py-3 px-4 text-sm">
              {alert.name}
            </div>
            <div className="w-[107px] py-3 px-4">
              <button
                className="w-full text-sm text-sky-600 hover:text-sky-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                aria-label={`View alert ${alert.id_notification}`}
              >
                Ver alerta
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="flex justify-center items-center self-start mt-4 px-4 h-10 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        aria-label="Attend to selected alerts"
      >
        Atender alertas
      </button>
    </section>
  );
};