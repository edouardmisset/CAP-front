import axios from 'axios'
import { useEffect, useState } from 'react'
import API from '../APIClient'
import AscentTable from '../components/AscentTable'
import Chart from '../components/Chart'
import getAscentsByGradeByStyle from '../utilities/ascentsByGradeByStyle'

const { CancelToken } = axios

export default function DashboardPage() {
  const [ascentList, setAscentList] = useState([]) // Use a context instead of useState
  const [ascentsByGradeByStyle, setAscentsByGradeByStyle] = useState(null)

  useEffect(() => {
    const source = CancelToken.source()

    // Get the ascents by grade by style
    // API.get(`/ascents/by-grade-by-style`)
    //   .then(({ data }) => {
    //     // setData(data)
    //   })
    //   .catch(window.console.error)

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
  }, [ascentList])

  return (
    <>
      <div className="charts-container">
        {!!ascentsByGradeByStyle && (
          <Chart
            x={ascentsByGradeByStyle.x}
            y={ascentsByGradeByStyle.y}
            title={ascentsByGradeByStyle.title}
          />
        )}
      </div>
      <AscentTable ascentList={ascentList} />
    </>
  )
}
