const textColor = '#fff'
const hoverColor = '#ccc'
const disabledColor = '#555'
const backgroundColor = '#444'

const graphOptions = {
  title: {
    text: 'Ascent by style',
    style: {
      color: textColor,
    },
  },
  legend: {
    itemStyle: {
      color: textColor,
    },
    itemHoverStyle: {
      color: hoverColor,
    },
    itemHiddenStyle: {
      color: disabledColor,
    },
  },
  chart: {
    backgroundColor,
  },
  series: [
    {
      type: 'column',
      data: [1, 2, 3, 4, 5],
      name: 'Onsight',
    },
    {
      type: 'column',
      data: [1, 2, 3, 4, 5],
      name: 'Flash',
    },
    {
      type: 'column',
      data: [1, 2, 3, 4, 5],
      name: '2 tries and more...',
    },
  ],
  xAxis: {
    categories: [1, 2, 3, 4, 5],
    labels: {
      style: {
        color: textColor,
      },
    },
    lineColor: textColor,
    tickColor: textColor,
  },
  yAxis: {
    title: {
      text: 'Number of ascents',
      style: {
        color: textColor,
      },
    },
    lineColor: textColor,
    tickColor: textColor,
    labels: {
      style: {
        color: textColor,
      },
    },
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

export { graphOptions, textColor, hoverColor, disabledColor, backgroundColor }
