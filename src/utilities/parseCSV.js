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
      // resolves the promise when complete
      complete: resolve,
      // rejects the promise when an error occurs
      error: reject,
    })
  })
