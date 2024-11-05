import Title from "@components/display/Title"
import Cards from "./Cards"
import GridDemo from "./GridDemo"

const TabFinanzas = () => {
  const sampleData = [
    {
      id: 1,
      name: 'Cuentas morosos',
      value: '00 / 00',
    },
    {
      id: 2,
      name: 'Dinero pendiente de pago',
      value: '$ 1.500,00',
    },
  ]

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-4 gap-4">
        {sampleData.map((data) => (
          <Cards key={data.id} name={data.name} value={data.value} />
        ))}
      </div>
      <div className="space-y-3">
        <Title label="Ingreso por módulo" size="2xl" />
        <GridDemo />
      </div>
    </div>
  )
}

export default TabFinanzas