const Cards = ({name, value}: {name: string, value: string}) => {
  return (
    <div className='p-5 rounded-md bg-white shadow-lg space-y-3'>
      <p className="font-semibold text-xl">{value}</p>
      <p className='text-zinc-500'>{name}</p>
    </div>
  )
}

export default Cards