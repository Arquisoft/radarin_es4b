import React, {useEffect, useState} from 'react';
import {Text, ScrollView, View, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {sendLocation} from './api/api.js';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Divider} from 'react-native-elements';
import Header from './components/Header';
import WebIDForm from './components/WebIDForm';

const App = () => {
  const [webId, setWebId] = useState();
  const [location, setLocation] = useState();

  const permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_ALWAYS
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  useEffect(() => {
    console.log('Checking permissions');
    check(permission)
      .then(resultCheck => {
        if (resultCheck === RESULTS.DENIED) {
          const rationale = {
            title: 'Necesitamos acceder a tu localización',
            message:
              'Necesitamos conocer tu localización para que tus amigos puedan encontrarte',
          };
          request(permission, rationale).then(resultRequest => {
            if (resultRequest === RESULTS.GRANTED) subscribe();
          });
        } else if (resultCheck === RESULTS.GRANTED) {
          subscribe();
        }
      })
      .catch(errorHandler);
  }, []);

  useEffect(() => {
    if (webId) {
      console.log('Getting current location');
      Geolocation.getCurrentPosition(locationChangeListener, errorHandler, {
        interval: 3000,
      });
    }
  }, [webId]);

  const subscribe = () => {
    console.log('Subscribed');
    Geolocation.watchPosition(locationChangeListener, errorHandler, {
      interval: 3000,
    });
  };

  const locationChangeListener = location => {
    console.log(location);
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
