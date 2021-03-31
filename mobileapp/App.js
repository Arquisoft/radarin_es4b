import React, {useState} from 'react';
import {Button, Text, TextInput, ScrollView, View} from 'react-native';
import RNLocation from 'react-native-location';

const App = () => {
  const [webId, setWebId] = useState('Vacío');
  const [location, setLocation] = useState();

  RNLocation.configure({
    distanceFilter: 1.0
  });

  RNLocation.checkPermission({
    ios: 'always',
    android: {
      detail: 'fine',
    },
  }).then(granted => granted? subscribe() : requestPermission());

  const requestPermission = () => {
    RNLocation.requestPermission({
      ios: 'always',
      android: {
        detail: 'fine',
        rationale: {
          title: 'Necesitamos acceder a tu localización',
          message:
            'Necesitamos conocer tu localización para que tus amigos puedan encontrarte',
          buttonPositive: 'Aceptar',
          buttonNegative: 'Cancelar',
        },
      },
    }).then(granted => {
      if (granted) {
        subscribe();
      }
    });
  };

  const subscribe = () => {
    RNLocation.subscribeToLocationUpdates(locations => {
      console.log(locations);
      setLocation(locations.sort((a, b) => a.timestamp - b.timestamp)[0]);
    });
  };

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
          onChangeText={text => setWebId(text)}></TextInput>
        <Button title="Enviar"></Button>
        <Text style={{marginTop: 10}}>WebID seleccionado: {webId}</Text>
        <Text style={{marginTop: 5}}>Latitud: {location?.latitude}</Text>
        <Text style={{marginTop: 5}}>Longitud: {location?.longitude}</Text>
        <Text style={{marginTop: 5}}>Altitud: {location?.altitude}</Text>
      </View>
    </ScrollView>
  );
};

export default App;
