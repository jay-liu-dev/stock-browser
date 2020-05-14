import React from 'react'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

import { toHighchartSeries } from 'utils/transform'
import './Chart.scss'

const chartOptions = {
  yAxis: {
    labels: {
      formatter: function() {
        return (this.value > 0 ? ' + ' : '') + this.value + '%'
      },
    },
    plotLines: [
      {
        value: 0,
        width: 2,
        color: 'silver',
      },
    ],
  },
  plotOptions: {
    series: {
      compare: 'percent',
      showInNavigator: true,
    },
  },
  tooltip: {
    pointFormat:
      '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
    valueDecimals: 2,
    split: true,
  },
  rangeSelector: {
    inputEnabled: false,
    buttonTheme: {
      visibility: 'hidden',
    },
    labelStyle: {
      visibility: 'hidden',
    },
  },
}

const StockChart = props => {
  const { series } = props
  const options = {
    ...chartOptions,
    series: toHighchartSeries(series),
  }

  if (!series.length) {
    return (
      <div className="chart-empty">
        Please select one or more stocks to watch
      </div>
    )
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={options}
    />
  )
}

StockChart.displayName = 'StockChart'
StockChart.propTypes = {
  series: PropTypes.arrayOf(
    PropTypes.shape({ stock: PropTypes.object, dataset: PropTypes.array }),
  ),
}

export default StockChart
