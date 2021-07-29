import { getGradeColor } from './utilities'

const unique = (array) => [...new Set(array)]

export default (ascentList) => {
  const x = unique(
    ascentList.map((ascent) => new Date(ascent.date).getFullYear())
  ).sort((a, b) => a - b)

  const grades = unique(ascentList.map((ascent) => ascent.topoGrade)).sort()

  return {
    title: 'Number of Ascents by Season by Grade',
    x,
    y: grades
      .map((grade) => ({
        type: 'column',
        name: grade,
        color: getGradeColor(grade),
        data: x.map(
          (year) =>
            ascentList.filter(
              (ascent) =>
                new Date(ascent.date).getFullYear() === year &&
                ascent.topoGrade === grade
            ).length
        ),
      }))
      .sort((a, b) => b.name.localeCompare(a.name)),
    stacking: 'normal',
  }
}
