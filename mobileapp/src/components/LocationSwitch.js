import React, {cloneElement, useEffect, useState} from 'react';
import {View, Switch, Text, StyleSheet} from 'react-native';
import {subscribe, unsubscribe} from '../location';
import {checkAndRequestPermissions} from '../permissions';
import {Icon} from 'react-native-elements';

import I18n from 'react-native-i18n';


I18n.fallbacks = true;

I18n.translations = {
  es: {
    "te": "Enviar mi ubicación"
  },
  en: {
    "te": "Send my location"
  },
};


const LocationSwitch = props => {
  const [enabled, setEnabled] = useState(false);
  const toggleSwitch = () => setEnabled(previousState => !previousState);

  useEffect(() => {
    enabled
      ? checkAndRequestPermissions(subscribe(props.webId), err =>
          console.log(err),
        )
      : unsubscribe();
  }, [enabled]);

  return (
    <View style={styles.container}>
      <Icon name="location-on" size={20}/>
      <Text style={styles.text}>{I18n.t('te')}</Text>
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
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    marginEnd: 'auto',
    marginStart: 5
  }
});

export default LocationSwitch;
