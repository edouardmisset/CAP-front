import axios from 'axios'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'
import API from '../APIClient'
import { graphOptions } from '../utilities/graphHelper'

const { CancelToken } = axios

export default function DashboardPage() {
  const [ascentsByGradeByStyleOptions, setAscentsByGradeByStyleOptions] =
    useState(graphOptions)

  const setChartData = (title, y, x) =>
    setAscentsByGradeByStyleOptions((previousOptions) => ({
      ...previousOptions,
      title,
      xAxis: [
        {
          categories: x,
        },
      ],
      series: [...previousOptions.series].map((series, index) => ({
        ...series,
        data: y[index],
        // name: y[index].name,
      })),
    }))

  useEffect(() => {
    const source = CancelToken.source()

    API.get(`${process.env.REACT_APP_API_BASE_URL}/ascents/by-grade-by-style`)
      .then(({ data }) => setChartData(data))
      .catch(window.console.error)

    return () => {
      if (source) {
        source.cancel('request cancelled')
      }
    }
  }, [])

  return (
    <div className="graphs">
      <p>Hi</p>
      {!!Object.keys(ascentsByGradeByStyleOptions).length && (
        <HighchartsReact
          highcharts={Highcharts}
          options={ascentsByGradeByStyleOptions}
        />
      )}
    </div>
  )
}
