function GetStatusLabel({ status }: { status: string }) {
  let colorClass: string;

  switch (status) {
    case 'En proceso':
      colorClass = 'bg-blue-500';
      break;
    case 'Cancelado':
      colorClass = 'bg-red-500';
      break;
    case 'Aceptado':
      colorClass = 'bg-green-500';
      break;
    case 'Activo':
      colorClass = 'bg-green-600';
      break;
    case 'Finalizado':
      colorClass = 'bg-gray-600';
      break;
    case 'Inactivo':
      colorClass = 'bg-gray-400';
      break;
    case 'En espera':
      colorClass = 'bg-yellow-500';
      break;
    case 'Rechazado':
      colorClass = 'bg-red-600';
      break;
    case 'En revisión':
      colorClass = 'bg-orange-500';
      break;
    case 'Pendiente':
      colorClass = 'bg-yellow-400';
      break;
    default:
      colorClass = 'bg-gray-500';
  }

  return (
    <label className={`${colorClass} rounded py-1 px-2 text-xs text-white whitespace-nowrap overflow-hidden`} title={status}>
      {status}
    </label>
  );
}

export default GetStatusLabel;