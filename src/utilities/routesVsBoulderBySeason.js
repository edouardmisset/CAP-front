import { getRouteBoulderColor } from './utilities'

const unique = (array) => [...new Set(array)]

export default (ascentList) => {
  const x = unique(
    ascentList.map((ascent) => new Date(ascent.date).getFullYear())
  ).sort((a, b) => a - b)

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
