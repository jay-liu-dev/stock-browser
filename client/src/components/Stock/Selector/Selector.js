import React from 'react'
import PropTypes from 'prop-types'
import AsyncSelect from 'react-select/async'
import { getStocksAutocomplete } from 'services/stocks'

import './Selector.scss'

const getStockOptionValue = stock => stock.symbol
const getStockOptionLabel = stock => stock.name

const StockSelector = props => {
  const { value, onChange } = props

  return (
    <AsyncSelect
      isMulti
      cacheOptions
      defaultOptions
      getOptionValue={getStockOptionValue}
      getOptionLabel={getStockOptionLabel}
      loadOptions={getStocksAutocomplete}
      value={value}
      onChange={onChange}
    />
  )
}

StockSelector.displayName = 'StockSelector'
StockSelector.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
}

export default StockSelector
