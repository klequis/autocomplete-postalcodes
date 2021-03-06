import React from 'react'
import { Field } from 'redux-form'
import { FormControl } from '@material-ui/core'
import Component from './Component'
/* Dev */
// eslint-disable-next-line
import { green, blue } from 'logger'

const styles = {
  field: {
    width: '100%',
  }
}
class PostalCodeRedux extends React.Component {
  picker = (props) => {
    // green('PostalCodeRedux: props', props)
    const { onChange, ...rest } = props.input
    return (
      <FormControl
        fullWidth={true}
      >
        <Component
          onChange={onChange}
          { ...rest }
        />
      </FormControl>
    )
  }

  render() {
    const { fieldLabel, fieldName } = this.props
    return (
      <Field style={styles.field}
        component={this.picker}
        name={fieldName}
        label={fieldLabel}
      />
    )
  }
}

export default PostalCodeRedux