/**
 * @description Returns the color for the given grade
 * @date 08/09/2021
 * @param {string} grade
 * @return {string} color
 */
const getGradeColor = (grade) => {
  switch (grade) {
    case '6a':
      return '#FFCE9D'
    case '6a+':
      return '#FFBF80'
    case '6b':
      return '#FFAA57'
    case '6b+':
      return '#FF8C1A'
    case '6c':
      return '#CE6600'
    case '6c+':
      return '#663300'
    case '7a':
      return '#A0E68E'
    case '7a+':
      return '#83DF6D'
    case '7b':
      return '#68D94A'
    case '7b+':
      return '#48BD28'
    case '7c':
      return '#24AD00'
    case '7c+':
      return '#146600'
    case '8a':
      return '#7BB5C3'
    case '8a+':
      return '#61A6B8'
    case '8b':
      return '#3B90A4'
    case '8b+':
      return '#2F7483'
    case '8c':
      return '#02677F'
    case '8c+':
      return '#013D4B'
    case '9a':
      return '#F999A4'
    case '9a+':
      return '#F77887'
    case '9b':
      return '#F55467'
    case '9b+':
      return '#F21831'
    case '9c':
      return '#C50017'
    case '9c+':
      return '#80000F'
    default:
      return '#999'
  }
}

/**
 * @description Returns the color for boulder or route
 * @date 08/09/2021
 * @param {string} routeOrBoulder
 * @return {string} color
 */
const getRouteBoulderColor = (routeOrBoulder) => {
  switch (routeOrBoulder) {
    case 'route':
      return '#02677F'
    case 'boulder':
      return '#F55467'
    default:
      return '#999'
  }
}

/**
 * @description Returns the color for the given ascent style
 * @date 08/09/2021
 * @param {string} style
 * @return {string} color
 */
const getStyleColor = (style) => {
  switch (style) {
    case 'twoAndMore':
      return '#FFAA57'
    case 'one':
      return '#68D94A'
    case 'flash':
      return '#68D94A'
    case 'onsight':
      return '#68D94A'
    default:
      return '#999'
  }
}

export { getRouteBoulderColor, getGradeColor, getStyleColor }
