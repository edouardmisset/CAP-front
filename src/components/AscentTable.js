import dayjs from 'dayjs'

export default function AscentTable({ ascentList }) {
  const numberOfAscents = ascentList.length

  const numberOfAscentDays = new Set(ascentList.map(({ date }) => date)).size

  return (
    numberOfAscents > 0 && (
      <div className="table">
        <h3>Ascents</h3>
        <p>
          {`${numberOfAscents} ascents over
          ${numberOfAscentDays} days`}
        </p>
        <table className="ascent-table">
          <thead>
            <tr>
              <th>Route Name</th>
              <th>Topo Grade</th>
              <th>Number Of Tries</th>
              <th>Crag</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {numberOfAscents > 0 &&
              ascentList.map(
                ({
                  routeName,
                  topoGrade,
                  date,
                  crag,
                  routeOrBoulder,
                  numberOfTries,
                  id,
                }) => (
                  <tr
                    key={id}
                    className={`${routeOrBoulder} ${topoGrade} ${numberOfTries}`}
                  >
                    <td>
                      {`${
                        routeOrBoulder === 'route' ? '🧗‍♂️' : '🪨'
                      } ${routeName}`}
                    </td>
                    <td>{topoGrade}</td>
                    <td>{numberOfTries}</td>
                    <td>{crag}</td>
                    <td>{dayjs(date).format('YYYY-MM-DD')}</td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    )
  )
}
