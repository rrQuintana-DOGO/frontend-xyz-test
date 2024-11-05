import React from 'react';
import moment from 'moment';

interface GetEtaStatusProps {
  estimatedArrival: number; // Fecha estimada en formato Unix (segundos)
  realArrival: number; // Fecha real en formato Unix (segundos)
}

const GetEtaStatus: React.FC<GetEtaStatusProps> = ({ estimatedArrival, realArrival }) => {
  if (!realArrival) {
    return <label className="text-xs w-44">-</label>;
  }

  const estimatedMoment = moment.unix(estimatedArrival);
  const realMoment = moment.unix(realArrival);
  const differenceInMinutes = realMoment.diff(estimatedMoment, 'minutes');

  let colorClass = '';
  let statusText = '';

  if (differenceInMinutes <= 0) {
    // Verde: ETA real es igual al ETA planeado
    colorClass = 'bg-green-500 text-white';
    statusText = 'A tiempo';
  } else if (differenceInMinutes > 0 && differenceInMinutes <= 30) {
    // Amarillo: ETA real entre 1 y 30 minutos del ETA planeado
    colorClass = 'bg-yellow-500 text-black';
    statusText = `+${differenceInMinutes} min`;
  } else {
    // Rojo: ETA real es mayor a 30 minutos del ETA planeado
    colorClass = 'bg-red-500 text-white';
    statusText = `+${differenceInMinutes} min`;
  }

  return (
    <label className={`${colorClass} rounded py-1 px-2 text-xs whitespace-nowrap w-44`}>
      {statusText}
    </label>
  );
};

export default GetEtaStatus;
