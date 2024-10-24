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

  if (differenceInMinutes === 0) {
    colorClass = 'bg-[#6DCCB1] text-black';
    statusText = 'A tiempo';
  } else if (differenceInMinutes < 0) {
    colorClass = 'bg-[#6DCCB1] text-black';
    statusText = 'A tiempo';
  } else if (differenceInMinutes <= 5) {
    colorClass = 'bg-[#6DCCB1] text-black';
    statusText = `+${differenceInMinutes} min`;
  } else if (differenceInMinutes <= 30) {
    colorClass = 'bg-yellow-500 text-white';
    statusText = `+${differenceInMinutes} min`;
  } else {
    colorClass = 'bg-[#DC0000] text-white';
    statusText = `+${differenceInMinutes} min`;
  }

  return (
    <label className={`${colorClass} rounded py-1 px-2 text-xs whitespace-nowrap w-44`}>
      {statusText}
    </label>
  );
};

export default GetEtaStatus;
