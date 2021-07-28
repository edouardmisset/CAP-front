const unique = (array) => [...new Set(array)]

export default (ascentList) => {
  const x = unique(ascentList.map((ascent) => ascent.topoGrade)).sort()
  const firstGo = x.map(
    (grade) =>
      ascentList.filter(
        (ascent) => ascent.topoGrade === grade && ascent.numberOfTries === 1
      ).length
  )
  // const flash = x.map((grade) => ({
  //   grade,
  //   count: ascentList.filter(
  //     (ascent) => ascent.topoGrade === grade && ascent.flash === true
  //   ).length,
  // }))
  const twoAndMoreTries = x.map(
    (grade) =>
      ascentList.filter(
        (ascent) => ascent.topoGrade === grade && ascent.numberOfTries >= 2
      ).length
  )
  return {
    x,
    y: [
      { data: firstGo, name: 'First Go', color: '#2ecc40' },
      { data: twoAndMoreTries, name: 'Second Go', color: '#ffdc00' },
    ],
    title: 'Number of Ascents by Grade by Style',
  }
}
