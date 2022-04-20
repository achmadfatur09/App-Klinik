import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './router';
import FlashMessage from "react-native-flash-message";
import { Loading } from './components';
import { Provider, useSelector } from 'react-redux';
require('./config/firebase');

export default function MainApp() {
  const stateGlobal = useSelector(state => state);
  console.log('state global: ', stateGlobal);
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {stateGlobal.loading && <Loading />}
    </>
  );
};

// cd "My Study\Univ Nurdin Hamzah\Semester VIII\Program\MyDoctor"

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

const styles = StyleSheet.create({});