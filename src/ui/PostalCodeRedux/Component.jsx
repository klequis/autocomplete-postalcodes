import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Autocomplete from 'react-autocomplete'
import { Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Input, MenuItem } from '@material-ui/core'
/* User */
import * as locationActions from 'store/actions/location-actions'
import * as locationSelectors from 'store/selectors/location-selectors'
/* Dev */
// eslint-disable-next-line
import { green, blue, red } from 'logger'

const INPUT_NAME = 'postalCode'
const REQUEST_LIMIT = 3

const wrapperProps = {
  width: '100%',

}

const renderMenu = (items, value) => {
  let ret = null
  const valueLength = value.length
  if (items.length === 0) {
    if (valueLength === 0) {
      ret = (
        <MenuItem className="item">
          Enter a postal code
        </MenuItem>
      )
    } else if (valueLength > 0 && valueLength < REQUEST_LIMIT) {
      ret = (
        <MenuItem className="item">
          minimum of {REQUEST_LIMIT} characters to search
        </MenuItem>
      )
    } else {
      ret = (
        <MenuItem className="item">
          Loading ...
        </MenuItem>
      )
    }
  } else {
    ret = items
  }

  return (
    <Paper className="menu">
      {ret}
    </Paper>
  )
}

const renderItem = (item, isHighlighted) => {
  return (
    item.header
    ? <MenuItem
        className="item item-header"
        key={item.header}
      >
        {item.header}
      </MenuItem>
    : <MenuItem
        className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
        key={item._id}
      >
        {item.searchString}
      </MenuItem>
  )
}

const renderInput = (props) => {
  const { ref, ...rest } = props
  return (
    <Input
      fullWidth
      inputRef={ref}
      error={true}
      inputProps={{
        placeholder: 'enter a postal code *',
      }}
      {...rest}
    />
  )
}

class AutosuggestRedux extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      suggestions: [],
      allSuggestions: [],
      queryLength: 0,
    }
  }

  requestSuggestions = async value => {
    const { queryLength } = this.state
    const valueLength = value.length
    if (valueLength < queryLength) {
      this.setState({
        queryLength: 0,
        allSuggestions: [],
      })
    }
    let getData
    if (valueLength >= REQUEST_LIMIT) {
      if (queryLength === 0) {
        getData = true
      } else if (valueLength < queryLength) {
        getData = true
      } else {
        getData = false
      }
    }
    if (getData) {
      blue('** get the data')
      await this.props.postalCodesReadRequest(value)
      this.setState({
        value,
        suggestions: this.props.suggestions
      })
    }


  }

  localOnChange = async (event, value) => {
    this.setState({ value, suggestions: [] })
    this.requestSuggestions(value)
    // this.debouncedRequestSuggestions(value)

  }

  handleOnSelect = (value, suggestion) => {
    // green('suggestion', suggestion)
    this.setState({ value, suggestions: [suggestion] })
    this.props.onChange(suggestion)
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.wrapper}>
        <Autocomplete
          getItemValue={(item) => item.searchString}
          inputProps={{ id: INPUT_NAME, className: 'width: 100%' }}
          items={this.state.suggestions}
          isItemSelectable={(item) => !item.header}
          onChange={(event, value) => this.localOnChange(event, value)}
          onSelect={(value, suggestion) => this.handleOnSelect(value, suggestion) }
          renderItem={(item, isHighlighted) => renderItem(item, isHighlighted)}
          renderMenu={(items, value) => renderMenu(items, value)}
          renderInput={(props) => renderInput(props)}
          value={this.state.value}
          wrapperProps={ {style: wrapperProps} }
          // required={true}
        />
      </div>
    )
  }
}

const styles = {
  wrapper: {
    marginTop: 40
  }
}

const mapStateToProps = (state) => {
  return {
    suggestions: locationSelectors.getPostalCodes(state)
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, locationActions)
)(AutosuggestRedux)