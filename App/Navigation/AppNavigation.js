import { StackNavigator } from 'react-navigation'
import SetupScreen from '../Containers/SetupScreen'
import LoginScreen from '../Containers/LoginScreen'
import TrainScreen from '../Containers/TrainScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  SetupScreen: { screen: SetupScreen },
  LoginScreen: { screen: LoginScreen },
  TrainScreen: { screen: TrainScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
