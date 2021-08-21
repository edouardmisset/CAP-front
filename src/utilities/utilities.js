/**
 * @description Returns an array of unique values from a given array
 * @date 20/08/2021
 * @param {Array} array - array
 */
const unique = (array) => [...new Set(array)]

/**
 * @description Returns true if the given object is empty
 * @date 20/08/2021
 * @param {Object} obj - object
 */
const isObjectEmpty = (obj) =>
  obj && Object.keys(obj).length === 0 && obj.constructor === Object

/**
 * @description Returns a random integer from the range [min - max] (inclusive)
 * @date 20/08/2021
 * @param {Number} min - integer
 * @param {Number} max - integer
 * @returns {Number} - integer
 */
const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

/**
 * @description Returns a list of unique years given a list of ascents
 * @date 20/08/2021
 * @param {*} ascentList - list of ascent object
 * @returns {Array} - array of number
 */
const getYearsFromAscentList = (ascentList) =>
  unique(ascentList.map((ascent) => new Date(ascent.date).getFullYear())).sort(
    (a, b) => a - b
  )

/**
 * @description Returns a list of unique grades given a list of ascents
 * @date 20/08/2021
 * @param {*} ascentList - list of ascent object
 * @returns {Array} - array of strings
 */
const getGradesFromAscentList = (ascentList) =>
  unique(ascentList.map((ascent) => ascent.topoGrade)).sort()

/**
 * @description Returns the average number of tries for a grade given an ascent list
 * @date 20/08/2021
 * @param {*} ascentList
 * @param {String} grade
 * @return {Number} number of tries
 */
const getAverageNumberOfTries = (ascentList, grade) => {
  const filteredAscentList = ascentList.filter(
    (ascent) => ascent.topoGrade === grade
  )
  const totalNumberOfTries = filteredAscentList.reduce(
    (acc, ascent) => acc + parseInt(ascent.numberOfTries, 10),
    0
  )
  return totalNumberOfTries / filteredAscentList.length
}

/**
 * @description Returns the average grade from a list of ascents
 * @date 20/08/2021
 * @param {Array} ascentList - list of ascents
 * @return {String} averageGrade - grade
 */
const getAverageGrade = (ascentList) => {
  const grades = getGradesFromAscentList(ascentList)
  const numberOfAscents = ascentList.length
  const numberOfAscentsTimesGradeNumber = grades.reduce(
    (acc, grade, index) =>
      acc +
      ascentList.filter(({ topoGrade }) => topoGrade === grade).length * index,
    0
  )
  return grades[Math.round(numberOfAscentsTimesGradeNumber / numberOfAscents)]
}

export {
  isObjectEmpty,
  randomIntFromInterval,
  unique,
  getYearsFromAscentList,
  getGradesFromAscentList,
  getAverageNumberOfTries,
  getAverageGrade,
}
