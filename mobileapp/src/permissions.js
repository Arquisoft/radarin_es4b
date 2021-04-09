import {Platform} from 'react-native';
import {
  checkMultiple,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

const permissions =
  Platform.OS === 'ios'
    ? [PERMISSIONS.IOS.LOCATION_ALWAYS]
    : Platform.Version >= 29
    ? [
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
      ]
    : [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];

export async function checkAndRequestPermissions(
  successCallback,
  errorCallback,
) {
  checkMultiple(permissions)
    .then(resultsCheck => {
      const permissionsDenied = getPermissionsByStatus(
        resultsCheck,
        RESULTS.DENIED,
      );
      const permissionsGranted = getPermissionsByStatus(
        resultsCheck,
        RESULTS.GRANTED,
      );
      if (permissionsDenied.length > 0) {
        requestMultiple(permissionsDenied).then(resultsRequest => {
          if (
            getPermissionsByStatus(resultsRequest, RESULTS.GRANTED).length ===
            permissions.length
          )
            successCallback();
        });
      } else if (permissionsGranted.length === permissions.length) {
        successCallback();
      }
    })
    .catch(error => errorCallback(error));
}

const getPermissionsByStatus = (permissionsToFilter, status) => {
  const permissionsByStatus = [];
  for (const permission of permissions) {
    if (permissionsToFilter[permission] === status)
      permissionsByStatus.push(permission);
  }
  return permissionsByStatus;
};
