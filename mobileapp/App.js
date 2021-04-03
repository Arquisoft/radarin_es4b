import React, {useEffect, useState} from 'react';
import {Text, ScrollView, View, Platform} from 'react-native';
import {sendLocation} from './api/api.js';
import {PERMISSIONS} from 'react-native-permissions';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Divider} from 'react-native-elements';
import Header from './src/components/Header';
import WebIDForm from './src/components/WebIDForm';
import {checkAndRequestPermissions} from './src/permissions';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const App = () => {
  const [webId, setWebId] = useState();
  const [location, setLocation] = useState();

  const LOCATION_TASK_NAME = "background_location_task";
  const permissions =
    Platform.OS === 'ios'
      ? [PERMISSIONS.IOS.LOCATION_ALWAYS]
      : [
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
        ];

  useEffect(() => {
    console.log('Checking permissions');
    checkAndRequestPermissions(permissions, subscribe, errorHandler);
  }, []);

  useEffect(() => {
    if (webId) {
      console.log('Getting current location');
      Location.getCurrentPositionAsync().then(handleLocation).catch(errorHandler);
    }
  }, [webId]);

  const subscribe = () => {
    console.log('Subscribed');
    Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {foregroundService: {
      notificationTitle: "Radarin",
      notificationBody: "Radarin está usando tu localización"
    }}).then(() => console.log("Background task created"));
    TaskManager.defineTask(LOCATION_TASK_NAME, ({ data: { locations }, error }) => {
      if (error) {
        errorHandler(error);
      } else {
        handleLocation(locations.sort(location => location.timestamp)[0]);
      }
    });
  };

  const handleLocation = location => {
    console.log(location);
    console.log(webId);
    setLocation(location);
    if (webId) sendLocation(webId, location);
  };

  const errorHandler = error => console.log(error);

  return (
    <SafeAreaProvider>
      <ScrollView>
        <Header></Header>
        <View
          style={{
            marginTop: 50,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <WebIDForm changeWebId={setWebId}></WebIDForm>
          {webId && (
            <View
              style={{
                marginTop: 20,
                marginStart: 5,
                marginEnd: 5,
              }}>
              <Divider></Divider>
              <Text style={{marginTop: 10}}>WebID: {webId}</Text>
              <Text style={{marginTop: 5}}>
                Latitud: {location?.coords.latitude}
              </Text>
              <Text style={{marginTop: 5}}>
                Longitud: {location?.coords.longitude}
              </Text>
              <Text style={{marginTop: 5}}>
                Altitud: {location?.coords.altitude}
              </Text>
              <Text style={{marginTop: 5}}>
                Hora: {new Date(location?.timestamp).toLocaleTimeString()}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default App;
