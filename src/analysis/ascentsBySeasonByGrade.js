import { getGradeColor } from '../utilities/colors'
import {
  getGradesFromAscentList,
  getYearsFromAscentList,
} from '../utilities/utilities'

export default (ascentList) => {
  const x = getYearsFromAscentList(ascentList)

  const grades = getGradesFromAscentList(ascentList)

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
