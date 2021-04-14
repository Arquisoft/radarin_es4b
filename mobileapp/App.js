import React, {useEffect, useState, useRef} from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Header from './src/components/Header';
import LoginForm from './src/components/LoginForm';
import {getObject, storeObject} from './src/storage.js';
import LoggedInView from './src/components/LoggedInView';

const App = () => {
  const [user, setUser] = useState();
  const didMount = useRef(false);

  useEffect(() => {
    getObject('user').then(user => {
      if (user) setUser(user);
    });
  }, []);

  useEffect(() => {
    if (didMount.current) storeObject('user', user);
    else didMount.current = true;
  }, [user]);

  return (
    <SafeAreaProvider>
      <Header></Header>
      <View
        style={{
          marginTop: 30,
          flex: 1,
        }}>
        {!user && (
          <ScrollView>
            <LoginForm changeUser={setUser}></LoginForm>
          </ScrollView>
        )}
        {user && <LoggedInView user={user} changeUser={setUser}></LoggedInView>}
      </View>
    </SafeAreaProvider>
  );
};

export default App;
