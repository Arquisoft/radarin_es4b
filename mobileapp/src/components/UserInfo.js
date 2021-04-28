import React from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import {Avatar} from 'react-native-elements';
import CustomButton from './CustomButton';
import getText from '../i18n.js';
import {unsubscribe} from '../location.js';
import {stopFriendUpdates} from '../friends';
import * as CurrentUser from '../user.js';

const UserInfo = ({user, changeUser}) => {
  const logOut = () => {
    unsubscribe();
    stopFriendUpdates();
    CurrentUser.clear();
    changeUser(null);
  };

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        onPress={() => Linking.openURL(user.webId)}
        size={'medium'}
        source={
          user.photo
            ? {uri: user.photo}
            : require('../../resources/images/icon-user-default.png')
        }
      />
      <Text style={styles.text}>{user.name}</Text>
      <CustomButton
        action={logOut}
        text={getText('logOut')}
        customContentStyles={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 16,
    marginEnd: 'auto',
    marginStart: 10,
  },
  button: {
    width: 100,
  },
});

export default UserInfo;
