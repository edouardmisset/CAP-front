/* eslint-disable import/prefer-default-export */
const graphOptions = {
  title: {
    text: 'Ascent by style',
  },
  chart: {
    // backgroundColor: '#444',
  },
  series: [
    {
      type: 'column',
      data: [1, 2, 3, 4, 5],
      // data: ascentsByGradeByStyle?.onsight,
      name: 'Onsight',
    },
    {
      type: 'column',
      data: [1, 2, 3, 4, 5],
      // data: ascentsByGradeByStyle?.flash,
      name: 'Flash',
    },
    {
      type: 'column',
      data: [1, 2, 3, 4, 5],
      // data: ascentsByGradeByStyle?.rest,
      name: '2 tries and more...',
    },
  ],
  xAxis: {
    categories: [1, 2, 3, 4, 5],
    // categories: ascentsByGradeByStyle?.grades,
  },
  yAxis: {
    title: { text: 'Number of ascents' },
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      dataLabels: {
        enabled: true,
      },
    },
  },
}

export { graphOptions }
