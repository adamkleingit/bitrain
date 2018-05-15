import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  state = {
    isLoading: false,
    error: null
  };

  componentDidMount() {
    const user = firebase.auth().currentUser;

    if (user) {
      this.props.navigation.navigate('TrainScreen');
    }
  }

  login = () => {
    this.setState({
      isLoading: true
    });
    firebase.auth().signInAnonymously()
      .then(({ user }) => {
        firebase.database().ref('stores/' + user.uid).once('value').then((store) => {
          console.log(store.val());
          this.setState({
            isLoading: false,
            error: null
          });
          this.props.navigation.navigate(
            store.val() ?
            'TrainScreen' :
            'SetupScreen');
        });
      })
      .catch(({ code, message }) => {
        this.setState({
          isLoading: false,
          error: message
        });
      });
  }

  render () {
    const { isLoading, error } = this.state;

    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>Welcome to Bitrain</Text>
          { error ? <Text>{ error }</Text> : null }
          <Button disabled={isLoading} onPress={ this.login } title="Login"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
