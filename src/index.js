/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import store from './store';

import AppContainer from './routes';
import { setNavigator } from './services/navigation';

const App = () => (
  <Provider store={store}>
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#D84315" barStyle="light-content" />
      <AppContainer ref={setNavigator} />
    </SafeAreaView>
  </Provider>
);

export default App;
