import Title from "../../../../components/Title"
import CardPercentages from "./CardPercentages"
import GridDemo from "./GridDemo"

const TabProducto = () => {
  const sampleData = [
    {
      percentage: '100%',
      name: 'Usuarios activos',
      label: 'Label',
      indicator: 'Indicador',
      body: 'body',
    },
    {
      percentage: '36%',
      name: 'Usuarios activos',
      label: 'Label',
      indicator: 'Indicador',
      body: 'body',
    },
    {
      percentage: '52%',
      name: 'Usuarios activos',
      label: 'Label',
      indicator: 'Indicador',
      body: 'body',
    }
  ]
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-4 gap-4">
        {sampleData.map((data, index) => (
          <CardPercentages key={index} percentage={data.percentage} name={data.name} label={data.label} indicator={data.indicator} body={data.body} />
        ))}
      </div>
      <div className="space-y-3">
        <Title label="Popularidad de módulos" size="2xl" />
        <GridDemo />
      </div>
    </div>
  )
}

export default TabProducto