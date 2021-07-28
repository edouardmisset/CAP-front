import dayjs from 'dayjs'

export default function AscentTable({ ascentList }) {
  return ascentList.length > 0 ? (
    <div className="table">
      <h3>Ascents</h3>
      <div className="table-filter">
        <p>Climber: {ascentList[0]?.climber}</p>
        <p>Route / Boulder: {ascentList[0]?.routeOrBoulder}</p>
      </div>
      <p>
        {`${ascentList.length} ascents over
          ${new Set(ascentList.map((ascent) => ascent.date)).size} days`}
      </p>
      <table className="ascent-table">
        <thead>
          <tr>
            <th>Route Name</th>
            <th>Topo Grade</th>
            <th>Number Of Tries</th>
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
                  <td>{numberOfTries}</td>
                  <td>{crag}</td>
                  <td>{dayjs(date).format('YYYY/MM/DD')}</td>
                  <td>{routeOrBoulder}</td>
                  <td>{climber}</td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  ) : null
}
