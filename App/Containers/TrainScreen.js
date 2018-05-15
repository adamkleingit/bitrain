import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Button, View } from 'react-native'
import { connect } from 'react-redux'
import { set } from 'lodash/fp';
import firebase from 'firebase';

import TrainHeader from '../Components/TrainHeader';
import TrainStep from '../Components/TrainStep';
import TrainResult from '../Components/TrainResult';

// Styles
import styles from './Styles/TrainScreenStyle'

class TrainScreen extends Component {
  state = {
    step: 0,
    guesses: [],
    hints: null,
    hashedPhrase: null
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;

    if (!user) {
      this.props.navigation.navigate('LoginScreen');
      return ;
    }
    firebase.database().ref('stores/' + user.uid).once('value').then((store) => {
      this.setState({
        hints: store.val().hints,
        hashedPhrase: store.val().mnemonic
      });
    });
  }

  prev = () => {
    this.setState({
      step: this.state.step - 1
    })
  }

  next = () => {
    this.setState({
      step: this.state.step + 1
    })
  }

  result = () => {
    this.setState({
      step: this.state.hints.length
    })
  }

  restart = () => {
    this.setState({
      step: 0,
      guesses: []
    })
  }

  makeGuess = (word) => {
    this.setState({
      guesses: set(this.state.step, word, this.state.guesses)
    })
  }

  render () {
    const { step, guesses, hints, hashedPhrase } = this.state;
    if (!hints) {
      return null;
    }
    const lastStep = step === hints.length;

    return (
      <ScrollView>
        <KeyboardAvoidingView behavior='position'>
          <TrainHeader navigation={ this.props.navigation }/>
          <Text>Now it's time to train</Text>
          {
            lastStep
            ? <TrainResult guesses={ guesses } hashedPhrase={ hashedPhrase }/>
            : <TrainStep hint={ hints[step] } onGuess={ this.makeGuess } onNext={ this.next } guess={guesses[step]}/>
          }
          <View
            style={styles.container}>
            <Button disabled={step === 0} onPress={ this.prev } title="Prev"/>
            <Button disabled={lastStep} onPress={ this.next } title="Next"/>
            <Button onPress={ this.result } title="Result"/>
            <Button onPress={ this.restart } title="Restart"/>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainScreen)
