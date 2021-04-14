import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import {sendLocation, getFriendsClose} from './api/api.js';
import getText from './i18n.js';
import {postNotification, clearNotfications} from './notifications';
import {AppState} from 'react-native';
import Toast from 'react-native-simple-toast';
import {checkAndRequestPermissions} from './permissions.js';
import {storeObject} from './storage.js';

const LOCATION_TASK_NAME = 'background_location_task';
let selectedWebId = undefined;
let handleLocationOnForeground = () => {};
let maxDistance = 100;

function defineTaskIfNotDefined() {
  if (!TaskManager.isTaskDefined(LOCATION_TASK_NAME)) {
    TaskManager.defineTask(LOCATION_TASK_NAME, ({data: {locations}, error}) => {
      if (error) {
        locationErrorHandler(error);
      } else {
        handleLocation(locations.sort(location => location.timestamp)[0]);
      }
    });
  }
}

function handleLocation(location) {
  console.log(location);
  console.log(selectedWebId);
  if (selectedWebId) {
    sendLocation(selectedWebId, location);
    getFriendsClose(selectedWebId, location, maxDistance)
      .then(results => {
        console.log(results);
        clearNotfications();
        results.forEach(friend =>
          postNotification(
            friend.nombre +
              getText('friendClose') +
              friend.distancia.toFixed() +
              getText('friendDistance'),
          ),
        );
      })
      .catch(err => console.log(err));
    storeObject('lastLocation', location);
    if (AppState.currentState === 'active') {
      handleLocationOnForeground(location);
    }
  }
}

function locationErrorHandler(error) {
  console.log(error);
}

/**
 * Solicita la ubicación actual del usuario
 * @param {(location: Location.LocationObject) => void} onLocationReceived callback llamado
 * cuando se recibe la localización
 */
export function getCurrentLocation(onLocationReceived) {
  checkAndRequestPermissions(
    () =>
      checkLocationEnabled(
        () => {
          Location.getCurrentPositionAsync().then(location =>
            onLocationReceived(location),
          );
        },
        () => Toast.show(getText('toastLocation')),
      ),
    err => console.log(err),
  );
}

/**
 * Hace que la aplicación escuche las actualizaciones de ubicación
 * @param {String} webId webId del usuario actual
 * @param {(location: Location.LocationObject) => void} foregroundLocationHandler callback llamado
 * cuando se recibe una nueva localización y la aplicación está en primer plano
 */
export function subscribe(webId, foregroundLocationHandler) {
  selectedWebId = webId;
  handleLocationOnForeground = foregroundLocationHandler;
  defineTaskIfNotDefined();
  Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME).then(started => {
    if (!started) {
      Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        foregroundService: {
          notificationTitle: 'Radarin',
          notificationBody: getText('usingLocation'),
        },
      }).then(() => console.log('Subscribed'));
    }
  });
}

/**
 * Hace que la aplicación deje de escuchar las actualizaciones de ubicación
 */
export function unsubscribe() {
  Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME).then(started => {
    if (started) {
      Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME).then(() =>
        console.log('Unsubscribed'),
      );
    }
  });
}

/**
 * Comprueba si la aplicación está suscrita a las actualizaciones de localización
 * @returns {Promise<Boolean>} promesa que se resuelve a `true` si está suscrita,
 *  o `false` si no
 */
export async function isSubscribed() {
  return await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
}

/**
 * Comprueba si el servicio de ubicación está activado
 * @param {Function} enabledCallback función a la que se llamará si está activado
 * @param {Function} disabledCallback función a la que se llamará si no está activado
 */
export function checkLocationEnabled(enabledCallback, disabledCallback) {
  Location.hasServicesEnabledAsync().then(enabled => {
    enabled ? enabledCallback() : disabledCallback();
  });
}

/**
 * Establece la distancia máxima para filtrar las notificaciones de amigos cercanos
 * @param {Number} distance
 */
export function setMaxDistance(distance) {
  maxDistance = distance;
}
