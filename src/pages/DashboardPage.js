import axios from 'axios'
import dayjs from 'dayjs'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'
import API from '../APIClient'
import { graphOptions } from '../utilities/graphHelper'

const { CancelToken } = axios

export default function DashboardPage() {
  const [ascentList, setAscentList] = useState([])
  const [ascentsByGradeByStyleOptions, setAscentsByGradeByStyleOptions] =
    useState(graphOptions)

  const setChartData = ({ x, y, title = '' }) =>
    setAscentsByGradeByStyleOptions((previousOptions) => ({
      ...previousOptions,
      title: { text: title },
      xAxis: [
        {
          categories: x,
        },
      ],
      series:
        // ...previousOptions.series,
        y.map((series) => ({
          // ...previousOptions.series[index],
          type: 'column',
          data: series.data.map((obj) => Object.values(obj)[0]),
          name: series.name,
          color: series.color,
        })),
    }))

  useEffect(() => {
    const source = CancelToken.source()

    // Get the ascents by grade by style
    API.get(`/ascents/by-grade-by-style`)
      .then(({ data }) => {
        window.console.log(data)
        setChartData(data)
      })
      .catch(window.console.error)

    // Get all the ascents
    API.get(`/ascents`)
      .then(({ data }) => {
        // window.console.log(data)
        setAscentList(data)
      })
      .catch(window.console.error)

    return () => {
      if (source) {
        source.cancel('request cancelled')
      }
    }
  }, [])

  return (
    <>
      <div className="charts-container">
        <HighchartsReact
          className="chart"
          highcharts={Highcharts}
          options={ascentsByGradeByStyleOptions}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Route Name</th>
            <th>Topo Grade</th>
            <th>numberOfTries</th>
            <th>Crag</th>
            <th>Date</th>
            <th>Route / Boulder</th>
            <th>Climber</th>
          </tr>
        </thead>
        <tbody>
          {!!ascentList.length &&
            ascentList.map(
              ({
                routeName,
                topoGrade,
                date,
                crag,
                climber,
                routeOrBoulder,
                numberOfTries,
                id,
              }) => (
                <tr key={id}>
                  <td>{routeName}</td>
                  <td>{topoGrade}</td>
                  <td>{dayjs(date).format('YYYY/MM/DD')}</td>
                  <td>{crag}</td>
                  <td>{climber}</td>
                  <td>{routeOrBoulder}</td>
                  <td>{numberOfTries}</td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </>
  )
}
