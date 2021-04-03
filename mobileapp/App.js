import React, {useEffect, useState} from 'react';
import {Text, ScrollView, View, Platform} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Divider} from 'react-native-elements';
import Header from './src/components/Header';
import WebIDForm from './src/components/WebIDForm';
import {checkAndRequestPermissions} from './src/permissions';
import * as Location from 'expo-location';
import {subscribe, locationErrorHandler, setSelectedWebId} from './src/location.js'

const App = () => {
  const [webId, setWebId] = useState();
  const [location, setLocation] = useState();

  const permissions =
    Platform.OS === 'ios'
      ? [PERMISSIONS.IOS.LOCATION_ALWAYS]
      : [
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
        ];

  useEffect(() => {
    console.log('Checking permissions');
    checkAndRequestPermissions(permissions, subscribe, locationErrorHandler);
  }, []);

  useEffect(() => {
    if (webId) {
      console.log('Getting current location');
      Location.getCurrentPositionAsync().then(location => setLocation(location)).catch(locationErrorHandler);
      setSelectedWebId(webId);
    }
  }, [webId]);

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
