import {
  getAverageNumberOfTries,
  getGradesFromAscentList,
} from '../utilities/utilities'

export default (ascentList) => {
  const grades = getGradesFromAscentList(ascentList)

  return {
    title: 'Number of Tries by Grade',
    x: grades,
    y: [
      {
        type: 'line',
        name: 'Average',
        color: 'grey',
        data: grades.map((grade) => getAverageNumberOfTries(ascentList, grade)),
      },
      {
        type: 'line',
        name: 'Minimum',
        color: 'skyblue',
        data: grades.map((grade) =>
          Math.min(
            ...ascentList
              .filter((ascent) => ascent.topoGrade === grade)
              .map((ascent) => ascent.numberOfTries)
          )
        ),
      },
      {
        type: 'line',
        name: 'Maximum',
        color: 'red',
        data: grades.map((grade) =>
          Math.max(
            ...ascentList
              .filter((ascent) => ascent.topoGrade === grade)
              .map((ascent) => ascent.numberOfTries)
          )
        ),
      },
    ],
  }
}
