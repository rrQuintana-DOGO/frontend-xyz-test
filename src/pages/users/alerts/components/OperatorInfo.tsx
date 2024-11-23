interface OperatorInfoProps {
  operator: {
    name: string;
    phone: string;
    email: string;
  };
  vehicle: {
    name: string;
    plate: string;
    route: string;
  };
}

export function OperatorInfo({ operator, vehicle }: OperatorInfoProps) {
  return (
    <div className="flex flex-col mt-4 w-full text-sm leading-none">
      <div className="flex gap-4 items-start w-full text-base font-bold leading-none whitespace-nowrap text-zinc-900">
        <div className="flex-1 shrink w-full min-w-[240px]">Asignación</div>
      </div>
      <div className="flex flex-wrap gap-6 items-center mt-4 w-full">
        <div className="flex overflow-hidden flex-col flex-1 shrink self-stretch my-auto basis-0">
          <div className="font-bold text-zinc-900">Operador 1</div>
          <div className="text-zinc-700">{operator.name}</div>
        </div>
        <div className="flex overflow-hidden flex-col flex-1 shrink self-stretch my-auto basis-0">
          <div className="font-bold text-zinc-900">Teléfono</div>
          <div className="text-zinc-700">{operator.phone}</div>
        </div>
        <div className="flex overflow-hidden flex-col flex-1 shrink self-stretch my-auto basis-0">
          <div className="font-bold text-zinc-900">Correo electrónico</div>
          <div className="text-zinc-700">{operator.email}</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-6 items-center mt-4 w-full">
        <div className="flex overflow-hidden flex-col flex-1 shrink self-stretch my-auto basis-0">
          <div className="font-bold text-zinc-900">Unidad</div>
          <div className="text-zinc-700">{vehicle.name}</div>
        </div>
        <div className="flex overflow-hidden flex-col flex-1 shrink self-stretch my-auto whitespace-nowrap basis-0">
          <div className="font-bold text-zinc-900">Placa</div>
          <div className="text-zinc-700">{vehicle.plate}</div>
        </div>
        <div className="flex overflow-hidden flex-col flex-1 shrink self-stretch my-auto basis-0">
          <div className="font-bold text-zinc-900">Línea transportista</div>
          <div className="text-zinc-700">{vehicle.route}</div>
        </div>
      </div>
    </div>
  );
}