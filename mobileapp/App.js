import React, {useEffect, useState, useRef} from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Divider} from 'react-native-elements';
import Header from './src/components/Header';
import LocationSwitch from './src/components/LocationSwitch';
import LoginForm from './src/components/LoginForm';
import UserInfo from './src/components/UserInfo';
import DistanceSlider from './src/components/DistanceSlider';
import {getObject, storeObject} from './src/storage.js';

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
      <ScrollView>
        <Header></Header>
        <View
          style={{
            marginTop: 30,
            flex: 1,
          }}>
          {!user && <LoginForm changeUser={setUser}></LoginForm>}
          {user && (
            <View
              style={{
                marginStart: 15,
                marginEnd: 15,
              }}>
              <UserInfo user={user} changeUser={setUser} />
              <Divider />
              <LocationSwitch webId={user.webId} />
              <DistanceSlider />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default App;
