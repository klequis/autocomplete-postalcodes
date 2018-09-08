import React from 'react'
import { compose } from 'recompose'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

/* User */
import PostalCodeRedux from 'ui/PostalCodeRedux'


/* Dev */
import ShowValues from 'ui/ui-elements/ShowValues'
// eslint-disable-next-line
import { green } from 'logger'


class Autocomplete extends React.Component {
  state = {
    values: '',
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.pageWrapper}>
        <form>

          <PostalCodeRedux
            fieldName='postalCode'
            fieldLabel='Postal Code'
            required={false}
          />
        </form>
        <ShowValues values={this.state.values} />
      </div>
    )
  }
}

const styles = {}

const mapStateToProps = (state) => {
  return {}
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  reduxForm({
    form: 'NewEvent',
  })
)(Autocomplete)