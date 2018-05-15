import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/TrainResultStyle'
import hash from '../Services/Hash'

// const HASHED_PHRASE = '02c8a34e16ca3d2d35dd319837ce6e84';
const HASHED_PHRASE = 'f01a1ca8d97109204da29f6d7e4e085f';

export default class TrainResult extends Component {
  static propTypes = {
    guesses: PropTypes.array,
    hashedPhrase: PropTypes.string
  }

  render () {
    const { guesses, hashedPhrase } = this.props;
    const result = hash(guesses) === hashedPhrase;

    return (
      <View style={styles.container}>
        { guesses.map((guess, index) => (
          <Text key={guess, index}>{ guess }</Text>
        )) }

        <Text style={{
          color: result ? 'green' : 'red'
        }}>{result ? 'OK' : 'Wrong'}</Text>
      </View>
    )
  }
}
