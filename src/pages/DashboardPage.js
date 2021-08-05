import axios from 'axios'
import { useEffect, useState } from 'react'
import API from '../APIClient'
import AscentTable from '../components/AscentTable'
import Chart from '../components/Chart'
import { isObjectEmpty } from '../utilities/utilities'
import getAscentsByGradeByStyle from '../analysis/ascentsByGradeByStyle'
import getAscentsBySeasonByGrade from '../analysis/ascentsBySeasonByGrade'
import getRoutesVsBoulderBySeason from '../analysis/routesVsBoulderBySeason'
import getAscentsByStyle from '../analysis/ascentsByStyle'
import getRoutesVsBoulder from '../analysis/routesVsBoulder'

const { CancelToken } = axios

export default function DashboardPage() {
  const [ascentList, setAscentList] = useState([]) // Use a context instead of useState ?
  const [filteredAscentList, setFilteredAscentList] = useState([]) // Use a context instead of useState ?
  const [ascentsByGradeByStyle, setAscentsByGradeByStyle] = useState({})
  const [ascentsBySeasonByGrade, setAscentsBySeasonByGrade] = useState({})
  const [routesVsBouldersBySeason, setRoutesVsBouldersBySeason] = useState({})
  const [ascentsByStyle, setAscentsByStyle] = useState({})
  const [routesVsBoulders, setRoutesVsBoulders] = useState({})

  const [selectedRouteOrBoulder, setSelectedRouteOrBoulder] = useState('')
  const [selectedSeason, setSelectedSeason] = useState('')
  const [availableSeasons, setAvailableSeasons] = useState([])

  // Fetch the user's ascent list
  useEffect(() => {
    const source = CancelToken.source()
    // Get all the ascents
    API.get(`/ascents`)
      .then(({ data }) => setAscentList(data))
      .catch(window.console.error)
    return () => {
      if (source) {
        source.cancel('request cancelled')
      }
    }
  }, [])

  useEffect(() => {
    setFilteredAscentList(ascentList)
  }, [ascentList])

  useEffect(() => {
    setAscentsByGradeByStyle(getAscentsByGradeByStyle(filteredAscentList))
    setAscentsBySeasonByGrade(getAscentsBySeasonByGrade(filteredAscentList))
    setRoutesVsBouldersBySeason(getRoutesVsBoulderBySeason(filteredAscentList))
    setAscentsByStyle(getAscentsByStyle(filteredAscentList))
    setRoutesVsBoulders(getRoutesVsBoulder(filteredAscentList))
    setAvailableSeasons(
      Array.from(
        new Set(
          filteredAscentList.map((ascent) =>
            new Date(ascent.date).getFullYear().toString()
          )
        )
      ).sort((a, b) => a - b)
    )
  }, [filteredAscentList])

  useEffect(() => {
    setFilteredAscentList(
      ascentList
        .filter((ascent) =>
          ascent.routeOrBoulder.includes(selectedRouteOrBoulder)
        )
        .filter((ascent) =>
          new Date(ascent.date)
            .getFullYear()
            .toString()
            .includes(selectedSeason)
        )
    )
  }, [selectedRouteOrBoulder, selectedSeason])

  return (
    <>
      <div className="table-filter">
        <label htmlFor="Season">
          Season:
          <select
            name="Season"
            id="Season"
            onChange={(event) => setSelectedSeason(event.target.value)}
          >
            <option value="">All</option>
            {!!availableSeasons.length &&
              availableSeasons.map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="routeOrBoulder">
          Route / Boulder:
          <select
            name="routeOrBoulder"
            id="routeOrBoulder"
            onChange={(event) => setSelectedRouteOrBoulder(event.target.value)}
          >
            <option value="">All</option>
            <option value="route">Route</option>
            <option value="boulder">Boulder</option>
          </select>
        </label>
      </div>
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
      <AscentTable ascentList={ascentList} />
    </>
  )
}
