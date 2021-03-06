import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Linking} from 'react-native';
import {Icon} from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import {authenticate} from '../api/api.js';
import getText from '../i18n.js';
import CustomLoadingButton from './CustomLoadingButton';
import * as CurrentUser from '../user.js';
import {storeSecretValue} from '../storage.js';
import {hashCode} from '../utils.js'

const LoginForm = ({changeUser}) => {
  const [idp, setIdp] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const authenticateWithCredentials = async credentials => {
    try {
      let {token, user} = await authenticate(credentials);
      storeSecretValue(`${hashCode(user.webId)}-token`, token);
      CurrentUser.setToken(token);
      changeUser(user);
    } catch (err) {
      Toast.show(err.message);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>{getText('logIn')}</Text>
        <Text style={styles.label}>{getText('provider')}</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setIdp(text)}
          placeholder={getText('providerPlaceholder')}></TextInput>
        <Text style={styles.label}>{getText('username')}</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setUsername(text)}
          placeholder={getText('usernamePlaceholder')}></TextInput>
        <Text style={styles.label}>{getText('password')}</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          placeholder={getText('passwordPlaceholder')}></TextInput>
        <CustomLoadingButton
          action={() =>
            authenticateWithCredentials({
              idp: idp?.replace(/\/$/, ''),
              username,
              password,
            })
          }
          text={getText('enviar')}
          customContainerStyles={styles.button}
        />
      </View>
      <View style={styles.infoContainer}>
        <Icon name={'info'} />
        <Text style={styles.infoText}>{getText('loginInfo')}</Text>
        <Text style={styles.infoText}>
          {getText('getAPod')}
          <Text
            style={styles.infoLink}
            onPress={() =>
              Linking.openURL('https://solidproject.org/users/get-a-pod')
            }>
            {getText('here')}
          </Text>
          .
        </Text>
        <Text style={styles.infoText}>
          {getText('trustedApps')}
          <Text
            style={styles.infoLink}
            onPress={() =>
              Linking.openURL(
                'https://github.com/solid/userguide#manage-your-trusted-applications',
              )
            }>
            {getText('here')}
          </Text>
          .
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginStart: 'auto',
    marginEnd: 'auto',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    height: 40,
    width: 270,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
  },
  button: {
    alignSelf: 'flex-end',
  },
  infoContainer: {
    margin: 25,
    marginTop: 30,
    padding: 15,
    backgroundColor: '#e3e3e3',
    borderRadius: 4,
    alignItems: 'flex-start',
  },
  infoText: {
    marginTop: 7,
  },
  infoLink: {
    color: '#3d48e3',
    textDecorationLine: 'underline',
  },
});

export default LoginForm;
