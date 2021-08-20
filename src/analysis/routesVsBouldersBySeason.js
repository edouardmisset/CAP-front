import { getRouteBoulderColor } from '../utilities/colors'
import { getYearsFromAscentList } from '../utilities/utilities'

export default (ascentList) => {
  const x = getYearsFromAscentList(ascentList)

  const routes = x.map(
    (year) =>
      ascentList.filter(
        (ascent) =>
          new Date(ascent.date).getFullYear() === year &&
          ascent.routeOrBoulder === 'route'
      ).length
  )

  const boulders = x.map(
    (year) =>
      ascentList.filter(
        (ascent) =>
          new Date(ascent.date).getFullYear() === year &&
          ascent.routeOrBoulder === 'boulder'
      ).length
  )

  return {
    title: 'Number of Routes VS Boulder by Season',
    x,
    y: [
      {
        name: 'Routes',
        data: routes,
        color: getRouteBoulderColor('route'),
        type: 'column',
      },
      {
        name: 'Boulders',
        data: boulders,
        color: getRouteBoulderColor('boulder'),
        type: 'column',
      },
    ],
    stacking: undefined,
  }
}
