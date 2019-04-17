/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { SafeAreaView, StatusBar } from "react-native";

import AppContainer from "./routes";

const App = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <StatusBar backgroundColor="#D84315" barStyle="light-content" />
    <AppContainer />
  </SafeAreaView>
);

export default App;
