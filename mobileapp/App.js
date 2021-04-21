import React from 'react';
import AppContent from './src/components/AppContent.js';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Header from './src/components/Header';

const App = () => {
  return (
    <SafeAreaProvider>
      <Header></Header>
      <AppContent></AppContent>
    </SafeAreaProvider>
  );
};

export default App;
