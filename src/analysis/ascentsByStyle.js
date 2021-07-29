import { getStyleColor } from '../utilities/colors'

export default (ascentList) => {
  const firstGo = ascentList.filter(
    (ascent) => ascent.numberOfTries === 1
  ).length

  // const flash = x.map((grade) => ({
  //   grade,
  //   count: ascentList.filter(
  //     (ascent) => ascent.topoGrade === grade && ascent.flash === true
  //   ).length,
  // }))
  const twoAndMoreTries = ascentList.filter(
    (ascent) => ascent.numberOfTries >= 2
  ).length

  return {
    title: 'Number of Ascents by Style',
    x: null,
    y: [
      {
        type: 'pie',
        name: 'Number of Ascents by Style',
        data: [
          {
            name: 'First Go',
            y: firstGo,
            color: getStyleColor('one'),
            sliced: true,
          },
          {
            name: 'Second Go and +',
            y: twoAndMoreTries,
            color: getStyleColor('twoAndMore'),
          },
        ],
      },
    ],
  }
}
