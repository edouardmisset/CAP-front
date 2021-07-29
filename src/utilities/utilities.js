const isObjectEmpty = (obj) =>
  obj && Object.keys(obj).length === 0 && obj.constructor === Object

const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

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

const getRouteBoulderColor = (routeOrBoulder) => {
  switch (routeOrBoulder) {
    case 'route':
      return 'blue'
    case 'boulder':
      return 'red'
    default:
      return '#999'
  }
}

export {
  isObjectEmpty,
  randomIntFromInterval,
  getRouteBoulderColor,
  getGradeColor,
}
