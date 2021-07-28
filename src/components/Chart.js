import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { graphOptions } from '../utilities/graphHelper'

export default function Chart({ x, y, title = '' }) {
  const setChartData = (xChart, yChart, chartTitle) => ({
    ...graphOptions,
    title: { ...graphOptions.title, text: chartTitle },
    xAxis: {
      ...graphOptions.xAxis,
      categories: xChart,
    },
    series: yChart.map((serie) => ({
      type: 'column',
      data: serie.data,
      name: serie.name,
      color: serie.color,
    })),
  })

  return (
    <HighchartsReact
      className="chart"
      highcharts={Highcharts}
      options={setChartData(x, y, title)}
    />
  )
}
