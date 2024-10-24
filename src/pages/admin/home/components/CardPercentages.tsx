const CardPercentages = ({ percentage, name, label, indicator, body }: { percentage: string, name: string, label: string, indicator: string, body: string }) => {
  return (
    <div className='p-5 rounded-md bg-white shadow-lg flex flex-row justify-between'>
      <div className="flex flex-col py-1">
        <p className="font-semibold text-3xl">{percentage}</p>
        <p className='text-zinc-500 mt-auto'>{name}</p>
      </div>
      <div className='flex flex-col justify-center'>
        <p className='text-zinc-500'>{label}</p>
        <p className='text-[#007E77] font-semibold'>{indicator}</p>
        <p className='text-zinc-500'>{body}</p>
      </div>
    </div>
  )
}

export default CardPercentages