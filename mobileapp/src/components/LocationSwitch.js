import React, {useRef, useEffect, useState} from 'react';
import {View, Switch, Text, StyleSheet} from 'react-native';
import {
  subscribe,
  unsubscribe,
  isSubscribed,
  checkLocationEnabled,
  getCurrentLocation,
  defineTaskIfNotDefined,
  setForegroundLocationHandler,
} from '../location';
import {checkAndRequestPermissions} from '../permissions';
import {Icon} from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import getText from '../i18n.js';

const LocationSwitch = props => {
  const [enabled, setEnabled] = useState(false);
  const toggleSwitch = () => {
    if (!enabled) {
      checkAndRequestPermissions(
        () =>
          checkLocationEnabled(
            () => {
              setEnabled(true);
            },
            () => Toast.show(getText('toastLocation')),
          ),
        err => console.log(err),
      );
    } else setEnabled(false);
  };

  const didMount = useRef(false);

  useEffect(() => {
    let mounted = true;
    defineTaskIfNotDefined();
    isSubscribed().then(subscribed => {
      if (subscribed && mounted) setEnabled(true);
    });
    return function cleanup() {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (didMount.current)
      if (enabled) {
        setForegroundLocationHandler(props.onLocationChange);
        // Solicita la ubicación actual para el usuario vea cambiar su ubicación
        // sin tener que esperar a que la tarea en segundo plano reciba una ubicación nueva
        getCurrentLocation();
        // Espera un segundo para que no lleguen varias localizaciones a la vez
        setTimeout(() => subscribe(), 1000);
      } else unsubscribe();
    else didMount.current = true;
    return function cleanup() {
      mounted = false;
    };
  }, [enabled]);

  return (
    <View style={styles.container}>
      <Icon name="location-on" size={20} />
      <Text style={styles.text}>{getText('location')}</Text>
      <Switch
        trackColor={{false: '#d6d6d6', true: '#9ec2ff'}}
        thumbColor={enabled ? '#007bff' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={enabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginEnd: 'auto',
    marginStart: 7,
  },
});

export default LocationSwitch;
