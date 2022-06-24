import React, { useState } from 'react';
import { StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Loading } from './components';
// import { Provider, useSelector } from 'react-redux';
import Router from './router';
import FlashMessage from "react-native-flash-message";
// import store from './redux/store';
require('./config/firebase');

LogBox.ignoreLogs(['Warning: ...']);
export default function MainApp() {
  const [loading, setLoading] = useState(false);
  // const stateGlobal = useSelector(state => state);
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {/* {stateGlobal.loading && <Loading />} */}
      {loading && <Loading />}
    </>
  );
};

// const App = () => {
//   return (
//     <Provider store={store}>
//       <MainApp />
//     </Provider>
//   );
// };

// set-ExecutionPolicy RemoteSigned -Scope CurrentUser
// Get-ExecutionPolicy
// Get-ExecutionPolicy -list

const styles = StyleSheet.create({});