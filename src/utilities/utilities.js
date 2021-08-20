const unique = (array) => [...new Set(array)]

const isObjectEmpty = (obj) =>
  obj && Object.keys(obj).length === 0 && obj.constructor === Object

const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const getYearsFromAscentList = (ascentList) =>
  unique(ascentList.map((ascent) => new Date(ascent.date).getFullYear())).sort(
    (a, b) => a - b
  )

const getGradesFromAscentList = (ascentList) =>
  unique(ascentList.map((ascent) => ascent.topoGrade)).sort()

export {
  isObjectEmpty,
  randomIntFromInterval,
  unique,
  getYearsFromAscentList,
  getGradesFromAscentList,
}
