import axios from 'axios'
import { useEffect, useState } from 'react'
import API from '../APIClient'
import AscentTable from '../components/AscentTable'
import Chart from '../components/Chart'
import { isObjectEmpty } from '../utilities/utilities'
import getAscentsByGradeByStyle from '../utilities/ascentsByGradeByStyle'
import getAscentsBySeasonByGrade from '../utilities/ascentsBySeasonByGrade'

const { CancelToken } = axios

export default function DashboardPage() {
  const [ascentList, setAscentList] = useState([]) // Use a context instead of useState
  const [ascentsByGradeByStyle, setAscentsByGradeByStyle] = useState({})
  const [ascentsBySeasonByGrade, setAscentsBySeasonByGrade] = useState({})

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
  }, [ascentList])

  return (
    <>
      <div className="charts-container">
        {!isObjectEmpty(ascentsByGradeByStyle) && (
          <Chart
            x={ascentsByGradeByStyle.x}
            y={ascentsByGradeByStyle.y}
            title={ascentsByGradeByStyle.title}
          />
        )}
        {!isObjectEmpty(ascentsBySeasonByGrade) && (
          <Chart
            x={ascentsBySeasonByGrade.x}
            y={ascentsBySeasonByGrade.y}
            title={ascentsBySeasonByGrade.title}
          />
        )}
      </div>
      <AscentTable ascentList={ascentList} />
    </>
  )
}
