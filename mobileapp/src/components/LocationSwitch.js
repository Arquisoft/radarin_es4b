import React, {useRef, useEffect, useState} from 'react';
import {View, Switch, Text, StyleSheet, ToastAndroid} from 'react-native';
import {subscribe, unsubscribe, checkLocationEnabled} from '../location';
import {checkAndRequestPermissions} from '../permissions';
import {Icon} from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import I18n from 'react-native-i18n';

const LocationSwitch = props => {
  const [enabled, setEnabled] = useState(false);
  const toggleSwitch = () =>
    checkAndRequestPermissions(
      () =>
        checkLocationEnabled(
          () => {
            setEnabled(previousState => !previousState);
          },
          () => Toast.show(I18n.t('toast')),
        ),
      err => console.log(err),
    );

  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) enabled ? subscribe(props.webId) : unsubscribe();
    else didMount.current = true;
  }, [enabled]);

  I18n.fallbacks = true;

  I18n.translations = {
    es: {
      location: 'Enviar mi ubicación',
      toast: 'Por favor, activa la localización',
    },
    en: {
      location: 'Send my location',
      toast: 'Please, enable the location service',
    },
  };

  return (
    <View style={styles.container}>
      <Icon name="location-on" size={20} />
      <Text style={styles.text}>{I18n.t('location')}</Text>
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
    marginStart: 5,
  },
});

export default LocationSwitch;
