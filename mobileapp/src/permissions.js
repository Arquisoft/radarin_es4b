import {
  checkMultiple,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';

export async function checkAndRequestPermissions(
  permissions,
  successCallback,
  errorCallback,
) {
  checkMultiple(permissions)
    .then(resultsCheck => {
      const permissionsDenied = getPermissionsByStatus(
        permissions,
        resultsCheck,
        RESULTS.DENIED,
      );
      const permissionsGranted = getPermissionsByStatus(
        permissions,
        resultsCheck,
        RESULTS.GRANTED,
      );
      if (permissionsDenied.length > 0) {
        requestMultiple(permissionsDenied).then(resultsRequest => {
          if (
            getPermissionsByStatus(permissions, resultsRequest, RESULTS.GRANTED)
              .length === permissions.length
          )
            successCallback();
        });
      } else if (permissionsGranted.length === permissions.length) {
        successCallback();
      }
    })
    .catch(error => errorCallback(error));
}

const getPermissionsByStatus = (permissions, permissionsChecked, status) => {
  const permissionsByStatus = [];
  for (const permission of permissions) {
    if (permissionsChecked[permission] === status)
      permissionsByStatus.push(permission);
  }
  return permissionsByStatus;
};
