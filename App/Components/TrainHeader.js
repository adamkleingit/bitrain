import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Button, PixelRatio } from 'react-native'
import firebase from 'firebase';

export default class TrainHeader extends Component {
  logout = () => {
    firebase.auth().signOut()
      .then(() => {
        this.props.navigation.navigate('LoginScreen');
      });
  }

  render () {
    const { uid } = firebase.auth().currentUser;

    return (
      <View style={{
          width: '100%',
          marginTop: 30,
          borderBottomColor: '#47315a',
          borderBottomWidth: 1 / PixelRatio.get()
        }}>
        {/* <Text style={{fontSize: 10}}>{ uid }</Text> */}
        <Button title="logout" onPress={ this.logout }/>
      </View>
    );
  }
}
