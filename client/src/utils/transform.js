export const toHighchartSeries = stockSeries =>
  stockSeries.map(data => {
    const {
      stock: { name },
      dataset,
    } = data

    return {
      name,
      data: dataset.map(({ timestamp, quote }) => [timestamp * 1000, quote]),
    }
  })
