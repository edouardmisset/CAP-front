import { useContext, useEffect, useState } from 'react'
import AscentTable from '../components/AscentTable'
import Chart from '../components/Chart'
import { isObjectEmpty } from '../utilities/utilities'
import getAscentsByGradeByStyle from '../analysis/ascentsByGradeByStyle'
import getAscentsBySeasonByGrade from '../analysis/ascentsBySeasonByGrade'
import getRoutesVsBoulderBySeason from '../analysis/routesVsBoulderBySeason'
import getAscentsByStyle from '../analysis/ascentsByStyle'
import getRoutesVsBoulder from '../analysis/routesVsBoulder'
import { AscentsContext } from '../contexts/AscentsContext'

export default function DashboardPage() {
  const { ascentList } = useContext(AscentsContext)
  const [filteredAscentList, setFilteredAscentList] = useState([]) // Use a context instead of useState ?
  const [ascentsByGradeByStyle, setAscentsByGradeByStyle] = useState({})
  const [ascentsBySeasonByGrade, setAscentsBySeasonByGrade] = useState({})
  const [routesVsBouldersBySeason, setRoutesVsBouldersBySeason] = useState({})
  const [ascentsByStyle, setAscentsByStyle] = useState({})
  const [routesVsBoulders, setRoutesVsBoulders] = useState({})

  const [selectedRouteOrBoulder, setSelectedRouteOrBoulder] = useState('')
  const [selectedSeason, setSelectedSeason] = useState('')
  const [availableSeasons, setAvailableSeasons] = useState([])
  const [selectedGrade, setSelectedGrade] = useState('')
  const [availableGrades, setAvailableGrades] = useState([])
  const [selectedNumberOfTries, setSelectedNumberOfTries] = useState('')
  const [availableNumberOfTries, setAvailableNumberOfTries] = useState([])

  useEffect(() => {
    setFilteredAscentList(ascentList)
    setAvailableSeasons(
      Array.from(
        new Set(ascentList.map((ascent) => new Date(ascent.date).getFullYear()))
      ).sort((a, b) => b - a)
    )
    setAvailableNumberOfTries(
      Array.from(
        new Set(ascentList.map((ascent) => ascent.numberOfTries))
      ).sort((a, b) => a - b)
    )
    setAvailableGrades(
      Array.from(new Set(ascentList.map((ascent) => ascent.topoGrade))).sort(
        (a, b) => b.localeCompare(a)
      )
    )
  }, [ascentList])

  useEffect(() => {
    setAscentsByGradeByStyle(getAscentsByGradeByStyle(filteredAscentList))
    setAscentsBySeasonByGrade(getAscentsBySeasonByGrade(filteredAscentList))
    setRoutesVsBouldersBySeason(getRoutesVsBoulderBySeason(filteredAscentList))
    setAscentsByStyle(getAscentsByStyle(filteredAscentList))
    setRoutesVsBoulders(getRoutesVsBoulder(filteredAscentList))
  }, [filteredAscentList])

  useEffect(() => {
    setFilteredAscentList(
      ascentList
        .filter(({ routeOrBoulder }) =>
          selectedRouteOrBoulder === ''
            ? true
            : routeOrBoulder === selectedRouteOrBoulder
        )
        .filter(({ date }) =>
          selectedSeason === ''
            ? true
            : new Date(date).getFullYear() === parseInt(selectedSeason, 10)
        )
        .filter(({ numberOfTries }) =>
          selectedNumberOfTries === ''
            ? true
            : numberOfTries === parseInt(selectedNumberOfTries, 10)
        )
        .filter(({ topoGrade }) =>
          selectedGrade === '' ? true : topoGrade === selectedGrade
        )
    )
  }, [
    selectedRouteOrBoulder,
    selectedSeason,
    selectedGrade,
    selectedNumberOfTries,
  ])

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
        <label htmlFor="Grade">
          Grade:
          <select
            name="Grade"
            id="Grade"
            onChange={(event) => setSelectedGrade(event.target.value)}
          >
            <option value="">All</option>
            {!!availableGrades.length &&
              availableGrades.map((topoGrade) => (
                <option key={topoGrade} value={topoGrade}>
                  {topoGrade}
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="NumberOfTries">
          Number Of Tries:
          <select
            name="NumberOfTries"
            id="NumberOfTries"
            onChange={(event) => setSelectedNumberOfTries(event.target.value)}
          >
            <option value="">All</option>
            {!!availableNumberOfTries.length &&
              availableNumberOfTries.map((numberOfTries) => (
                <option key={numberOfTries} value={numberOfTries}>
                  {numberOfTries}
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
