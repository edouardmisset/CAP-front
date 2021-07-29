import { getRouteBoulderColor } from '../utilities/colors'

export default (ascentList) => {
  const routes = ascentList.filter(
    (ascent) => ascent.routeOrBoulder === 'route'
  ).length

  const boulders = ascentList.filter(
    (ascent) => ascent.routeOrBoulder === 'boulder'
  ).length

  return {
    title: 'Number of Routes VS Boulder',
    x: null,
    y: [
      {
        type: 'pie',
        name: 'Number of Routes VS Boulder',
        data: [
          {
            name: 'Routes',
            y: routes,
            color: getRouteBoulderColor('route'),
          },
          {
            name: 'Boulders',
            y: boulders,
            color: getRouteBoulderColor('boulder'),
          },
        ],
      },
    ],
  }
}
