import React from 'react'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
// User
import withRoot from 'ui/withRoot'
import Autocomplete from 'ui/Autocomplete'

// eslint-disable-next-line
import { green } from 'logger'

class App extends React.Component {
  componentDidUpdate() {
    green('App.componentDidUpdate')
  }

  render() {
    return (
      <Autocomplete />
    )
  }
}

const styles = {
  page: {
    marginTop: 80
  }
}

export default compose(
  withStyles(styles),
)(withRoot(App))