import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native'
import styles from './Styles/TrainStepStyle'

export default class TrainStep extends Component {
  static propTypes = {
    hint: PropTypes.string,
    guess: PropTypes.string,
    onGuess: PropTypes.func,
    onNext: PropTypes.func,
  }

  onSubmitEditing = (d) => {
    this.props.onNext();
  }

  render () {
    const { hint, guess, onGuess } = this.props;

    return (
      <View style={styles.container}>
        <Text>{ hint }</Text>
        <TextInput
          key={hint}
          returnKeyType="next"
          autoCapitalize="none"
          autoFocus
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={ onGuess }
          onSubmitEditing={ this.onSubmitEditing }
          value={guess}/>
      </View>
    )
  }
}
