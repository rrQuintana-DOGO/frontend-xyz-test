import Cards from "./Cards"

const TabOperativo = () => {
  const sampleData = [
    {
      id: 1,
      name: 'Usuarios activos',
      value: '500 / 575',
    },
    {
      id: 2,
      name: 'Viajes procesados',
      value: '10,000',
    },
    {
      id: 3,
      name: 'Unidades conectadas / creadas',
      value: '5,000 / 5,000',
    },
    {
      id: 4,
      name: 'Cuentas demo y productivas',
      value: '500 / 575',
    },
    {
      id: 5,
      name: 'Cuentas creadas',
      value: '130',
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-4">
      {sampleData.map((data) => (
        <Cards key={data.id} name={data.name} value={data.value} />
      ))}
    </div>

  )
}

export default TabOperativo