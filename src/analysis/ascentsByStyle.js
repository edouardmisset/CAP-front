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

  console.log({ firstGo, twoAndMoreTries })

  return {
    x: null,
    y: [
      {
        type: 'pie',
        name: 'Number of Ascents by Style',
        data: [
          {
            name: 'Second Go and +',
            y: twoAndMoreTries,
            color: getStyleColor('twoAndMore'),
          },
          {
            name: 'First Go',
            y: firstGo,
            color: getStyleColor('one'),
            sliced: true,
          },
        ],
      },
    ],
    title: 'Number of Ascents by Style',
    stacking: 'normal',
  }
}
