import axios from 'axios'
import { useEffect, useState } from 'react'
import API from '../APIClient'
import AscentTable from '../components/AscentTable'
import Chart from '../components/Chart'
import { isObjectEmpty } from '../utilities/utilities'
import getAscentsByGradeByStyle from '../analysis/ascentsByGradeByStyle'
import getAscentsBySeasonByGrade from '../analysis/ascentsBySeasonByGrade'
import getRoutesVsBoulderBySeason from '../analysis/routesVsBoulderBySeason'

const { CancelToken } = axios

export default function DashboardPage() {
  const [ascentList, setAscentList] = useState([]) // Use a context instead of useState
  const [ascentsByGradeByStyle, setAscentsByGradeByStyle] = useState({})
  const [ascentsBySeasonByGrade, setAscentsBySeasonByGrade] = useState({})
  const [routesVsBouldersBySeason, setRoutesVsBouldersBySeason] = useState({})

  useEffect(() => {
    const source = CancelToken.source()
    // Get all the ascents
    API.get(`/ascents`)
      .then(({ data }) => {
        setAscentList(data)
      })
      .catch(window.console.error)
    return () => {
      if (source) {
        source.cancel('request cancelled')
      }
    }
  }, [])

  useEffect(() => {
    setAscentsByGradeByStyle(getAscentsByGradeByStyle(ascentList))
    setAscentsBySeasonByGrade(getAscentsBySeasonByGrade(ascentList))
    setRoutesVsBouldersBySeason(getRoutesVsBoulderBySeason(ascentList))
  }, [ascentList])

  return (
    <>
      <div className="charts-container">
        {!isObjectEmpty(ascentsByGradeByStyle) && (
          <Chart
            x={ascentsByGradeByStyle.x}
            y={ascentsByGradeByStyle.y}
            title={ascentsByGradeByStyle.title}
            stacking={ascentsByGradeByStyle.stacking}
          />
        )}
        {!isObjectEmpty(ascentsBySeasonByGrade) && (
          <Chart
            x={ascentsBySeasonByGrade.x}
            y={ascentsBySeasonByGrade.y}
            title={ascentsBySeasonByGrade.title}
            stacking={ascentsByGradeByStyle.stacking}
          />
        )}
        {!isObjectEmpty(routesVsBouldersBySeason) && (
          <Chart
            x={routesVsBouldersBySeason.x}
            y={routesVsBouldersBySeason.y}
            title={routesVsBouldersBySeason.title}
            stacking={routesVsBouldersBySeason.stacking}
          />
        )}
      </div>
      <AscentTable ascentList={ascentList} />
    </>
  )
}
