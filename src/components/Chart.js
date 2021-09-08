import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { graphOptions } from '../utilities/graphHelper'

// Create a new chart using Highcharts and the default options from the graphHelper.js and props
export default function Chart({ x, y, title = '', stacking = null }) {
  /**
   * @description Returns a Highcharts options object with the given input and graphHelper's options
   * @date 08/09/2021
   * @param {Array} xChart - The x-axis data
   * @param {Array} yChart - The y-axis data
   * @param {String} chartTitle - The title of the chart
   * @param {Boolean} chartStacking - The stacking of the chart
   */
  const setChartData = (xChart, yChart, chartTitle, chartStacking) => ({
    ...graphOptions,
    chart: {
      ...graphOptions.chart,
    },
    title: { ...graphOptions.title, text: chartTitle },
    xAxis: {
      ...graphOptions.xAxis,
      categories: xChart,
    },
    series: yChart.map((serie) => ({
      type: serie.type,
      data: serie.data,
      name: serie.name,
      color: serie.color,
    })),
    plotOptions: {
      ...graphOptions.plotOptions,
      column: {
        ...graphOptions.plotOptions.column,
        stacking: chartStacking,
      },
    },
  })

  return (
    <HighchartsReact
      className="chart"
      highcharts={Highcharts}
      options={setChartData(x, y, title, stacking)}
    />
  )
}
