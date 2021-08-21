import { getAverageGrade, getYearsFromAscentList } from '../utilities/utilities'

const filterAscentByYear = (ascentList, year) =>
  ascentList.filter((ascent) => new Date(ascent.date).getFullYear() === year)

export default (ascentList) => {
  const years = getYearsFromAscentList(ascentList)

  return {
    title: 'Max and Average Grades by Season',
    x: years,
    y: [
      {
        type: 'line',
        name: 'Average',
        color: 'limegreen',
        data: years.map((year) =>
          getAverageGrade(filterAscentByYear(ascentList, year))
        ),
      },
      {
        type: 'line',
        name: 'Maximum',
        color: 'orange',
        data: years.map(
          (year) =>
            filterAscentByYear(ascentList, year)
              .map((ascent) => ascent.topoGrade)
              .sort((a, b) => b.localeCompare(a))[0]
        ),
      },
    ],
  }
}
