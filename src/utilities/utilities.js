const unique = (array) => [...new Set(array)]

const isObjectEmpty = (obj) =>
  obj && Object.keys(obj).length === 0 && obj.constructor === Object

const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export { isObjectEmpty, randomIntFromInterval, unique }
