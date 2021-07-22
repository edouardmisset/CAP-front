import papa from 'papaparse'

export default (file) =>
  new Promise((resolve, reject) => {
    papa.parse(file, {
      delimiter: ',',
      newline: '\n',
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      comments: '#',
      quoteChar: '"',
      escapeChar: '\\',
      trim: true,
      complete: resolve,
      error: reject,
    })
  })
