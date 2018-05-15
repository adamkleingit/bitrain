import { Text } from 'react-native'
import DebugConfig from './DebugConfig'
import AppConfig from './AppConfig'
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function(notification) {
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  }
});

PushNotification.localNotificationSchedule({
  message: "Time to train your recovery phrase",
  date: new Date(Date.now() + (60 * 1000 * 60 * 24 * 7)) // in 7 days
});

// Allow/disallow font-scaling in app
Text.defaultProps.allowFontScaling = AppConfig.allowTextFontScaling

if (__DEV__) {
  // If ReactNative's yellow box warnings are too much, it is possible to turn
  // it off, but the healthier approach is to fix the warnings.  =)
  console.disableYellowBox = !DebugConfig.yellowBox
}
