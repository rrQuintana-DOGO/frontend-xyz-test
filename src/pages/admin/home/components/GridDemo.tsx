import { BarChart } from '@mui/x-charts/BarChart';

export const dataset = [
  {
    Value: 400,
    Label: 'Combustible',
  },
  {
    Value: 312,
    Label: 'Mantenimiento',
  },
  {
    Value: 292,
    Label: 'Temperatura',
  },
  {
    Value: 185,
    Label: 'Alertas',
  },
  {
    Value: 67,
    Label: 'Unidades',
  },
];

export function valueFormatter(value: number | null) {
  return `${value}mm`;
}

const chartSetting = {
  xAxis: [],
  width: 700,
  height: 400,
};

export default function GridDemo() {
  return (
    <div className='py-3 px-20 rounded-md bg-white shadow-lg w-min flex items-center'>
      <BarChart
        dataset={dataset}
        yAxis={[{ dataKey: 'Label', scaleType: 'band',  }]}
        series={[{ dataKey: 'Value', valueFormatter, color: '#007E77',   }]}
        layout="horizontal"
        grid={{ vertical: true }}
        sx={{ paddingBlockStart: '50px', marginTop: '-80px' }}
        {...chartSetting}
      />
    </div>
  );
}
