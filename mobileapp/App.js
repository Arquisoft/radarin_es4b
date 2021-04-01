import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, ScrollView, View, PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {sendLocation} from './api/api.js'

const App = () => {
  const [formText, setFormText] = useState();
  const [webId, setWebId] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    Platform.OS === 'ios'? requestAuthorizationIOS() : checkAndRequestPermissionAndroid();
  },[]);

  useEffect(() => {
    Geolocation.getCurrentPosition(locationChangeListener, errorHandler, {
      interval: 3000
    });
  },[webId]);

  const requestAuthorizationIOS = () => {
    Geolocation.requestAuthorization("always").then((permission) => {
      if(permission === "granted")
        subscribe();
    })
  }
  
  const checkAndRequestPermissionAndroid = () => {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((granted) => {
      if(!granted) {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
          title: 'Necesitamos acceder a tu localización',
          message:
            'Necesitamos conocer tu localización para que tus amigos puedan encontrarte',
          buttonPositive: 'Aceptar',
          buttonNegative: 'Rechazar'
        }).then((status) => {
          if (status === PermissionsAndroid.RESULTS.GRANTED)
            subscribe();
        })
      } else 
        subscribe();
    })
  };

  const subscribe = () => {
    console.log("Subscribed");
    Geolocation.watchPosition(locationChangeListener, errorHandler, {
      interval: 3000
    });
  };

  const locationChangeListener = (location) => {
    console.log(location);
    setLocation(location);
    if(webId)
      sendLocation(webId, location);
  };

  const errorHandler = (error) => console.log(error);

  return (
    <ScrollView>
      <View
        style={{
          marginTop: 100,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Escribe tu WebID:</Text>
        <TextInput
          style={{
            height: 40,
            width: 200,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          onChangeText={(text) => setFormText(text)}></TextInput>
        <Button title="Enviar" onPress={() => setWebId(formText)}></Button>
        {webId && <View>
          <Text style={{marginTop: 10}}>WebID seleccionado: {webId}</Text>
          <Text style={{marginTop: 5}}>Latitud: {location?.coords.latitude}</Text>
          <Text style={{marginTop: 5}}>Longitud: {location?.coords.longitude}</Text>
          <Text style={{marginTop: 5}}>Altitud: {location?.coords.altitude}</Text>
          <Text style={{marginTop: 5}}>Hora: {new Date(location?.timestamp).toLocaleTimeString()}</Text>
        </View>}
      </View>
    </ScrollView>
  );
};

export default App;
