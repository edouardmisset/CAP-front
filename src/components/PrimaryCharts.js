import { useEffect, useState, useContext } from 'react'
import Chart from './Chart'
import getAscentsByGradeByStyle from '../analysis/ascentsByGradeByStyle'
import getAscentsBySeasonByGrade from '../analysis/ascentsBySeasonByGrade'
import getRoutesVsBouldersBySeason from '../analysis/routesVsBouldersBySeason'
import getRoutesVsBoulders from '../analysis/routesVsBoulders'
import getAscentsByStyle from '../analysis/ascentsByStyle'
import { isObjectEmpty } from '../utilities/utilities'
import { AscentsContext } from '../contexts/AscentsContext'

export default function PrimaryCharts() {
  const { filteredAscentList } = useContext(AscentsContext)

  const [ascentsByGradeByStyle, setAscentsByGradeByStyle] = useState({})
  const [ascentsBySeasonByGrade, setAscentsBySeasonByGrade] = useState({})
  const [routesVsBouldersBySeason, setRoutesVsBouldersBySeason] = useState({})
  const [ascentsByStyle, setAscentsByStyle] = useState({})
  const [routesVsBoulders, setRoutesVsBoulders] = useState({})

  useEffect(() => {
    setAscentsByGradeByStyle(getAscentsByGradeByStyle(filteredAscentList))
    setAscentsBySeasonByGrade(getAscentsBySeasonByGrade(filteredAscentList))
    setRoutesVsBouldersBySeason(getRoutesVsBouldersBySeason(filteredAscentList))
    setAscentsByStyle(getAscentsByStyle(filteredAscentList))
    setRoutesVsBoulders(getRoutesVsBoulders(filteredAscentList))
  }, [filteredAscentList])

  return (
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
      {!isObjectEmpty(ascentsByStyle) && (
        <Chart
          x={ascentsByStyle.x}
          y={ascentsByStyle.y}
          title={ascentsByStyle.title}
          stacking={ascentsByStyle.stacking}
        />
      )}
      {!isObjectEmpty(routesVsBoulders) && (
        <Chart
          x={routesVsBoulders.x}
          y={routesVsBoulders.y}
          title={routesVsBoulders.title}
          stacking={routesVsBoulders.stacking}
        />
      )}
    </div>
  )
}
