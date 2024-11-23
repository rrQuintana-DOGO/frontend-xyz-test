interface RouteProgressProps {
  checkpoints: Array<{
    name: string;
    status: "completed" | "current" | "pending";
  }>;
}

export function RouteProgress({ checkpoints }: RouteProgressProps) {
  return (
    <div className="flex flex-wrap items-start py-8 mt-4 w-full">
      {checkpoints.map((checkpoint) => (
        <div
          key={checkpoint.name}
          className="flex overflow-hidden flex-col flex-1 shrink basis-0"
        >
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-1 shrink self-stretch my-auto h-0.5 basis-0 bg-slate-300" />
            {checkpoint.status === "completed" && (
              <img
                src="/icons/checkpoint-complete.svg"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              />
            )}
            {checkpoint.status === "current" && (
              <img
                src="/icons/checkpoint-current.svg"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square rounded-[32px]"
              />
            )}
            {checkpoint.status === "pending" && (
              <div className="flex shrink-0 self-stretch my-auto w-4 h-4 border-2 border-solid border-slate-300 stroke-[2px] stroke-slate-300" />
            )}
            <div className="flex flex-1 shrink self-stretch my-auto h-0.5 basis-0 bg-slate-300" />
          </div>
          <div className="mt-2 text-base font-bold text-center text-gray-500">
            {checkpoint.name}
          </div>
        </div>
      ))}
    </div>
  );
}