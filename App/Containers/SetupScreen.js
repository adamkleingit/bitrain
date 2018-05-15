import React, { Component } from 'react'
import { ScrollView, View, Text, KeyboardAvoidingView, Button, TextInput } from 'react-native'
import TrainHeader from '../Components/TrainHeader';
import { connect } from 'react-redux'
import firebase from 'firebase';
import hash from '../Services/Hash';

// Styles
import styles from './Styles/SetupScreenStyle'

class SetupScreen extends Component {
  state = {
    step: 0,
    value_0: ''
  };
  componentDidMount() {
    const user = firebase.auth().currentUser;

    if (!user) {
      this.props.navigation.navigate('LoginScreen');
    }
  }
  onChange = (text) => {
    const { step } = this.state;

    this.setState({
      [`value_${step}`]: text
    });
  }
  prev = () => {
    this.setState({
      step: this.state.step - 1
    });
  }
  next = () => {
    this.setState({
      step: this.state.step + 1
    });
  }

  submit = () => {
    const user = firebase.auth().currentUser;

    firebase.database().ref('stores/' + user.uid).set({
      mnemonic: hash(this.getMnemonic()),
      hints: this.getHints()
    }).then(() => {
      this.props.navigation.navigate('TrainScreen');
    });
  }
  getHints() {
    return Array(this.getStepsCount()).fill()
      .map((_, i) => this.state[`value_${i+1}`]);
  }
  getStepsCount() {
    return this.getMnemonic().length;
  }
  getMnemonic() {
    return this.state.value_0.split(' ');
  }
  render () {
    const { step } = this.state;
    const value = this.state[`value_${step}`];
    const lastStep = step === this.getStepsCount();

    const prompt = step ?
      `Please enter hint for ${this.getMnemonic()[step - 1]}` :
      'Enter your mnemonic (don\'t worry it\'s encrypted really good)';

    return (
      <ScrollView>
        <TrainHeader navigation={ this.props.navigation }/>
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.container}>
            <Text>{ prompt }</Text>
            <TextInput
              key={step}
              returnKeyType="next"
              autoCapitalize="none"
              autoFocus={ !!step }
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={ this.onChange }
              onSubmitEditing={ lastStep ? this.submit : this.next }
              value={value}/>

            <Button disabled={step === 0} onPress={ this.prev } title="Prev"/>
            <Button disabled={lastStep} onPress={ this.next } title="Next"/>
            <Button disabled={!lastStep} onPress={ this.submit } title="Go"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SetupScreen)
