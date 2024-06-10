import {Platform} from 'react-native';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';

export const requestLocationPermission = async () => {
  try {
    let permissionStatus;

    if (Platform.OS === 'android') {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } else {
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    }

    if (permissionStatus === RESULTS.GRANTED) {
      // Location permission has already been granted.
      // You can now proceed to use the location.
      console.log('Location permission already granted');
    } else if (permissionStatus === RESULTS.DENIED) {
      // Location permission has been denied, request it now.
      const result = await request(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );

      if (result === RESULTS.GRANTED) {
        // Location permission has been granted.
        // You can now proceed to use the location.
        console.log('Location permission granted');
      } else {
        // Location permission denied.
        console.log('Location permission denied');
      }
    } else {
      // Location permission denied permanently.
      console.log('Location permission denied permanently');
    }
  } catch (error) {
    console.error('Error requesting location permission: ', error);
  }
};
