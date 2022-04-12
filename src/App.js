import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
<<<<<<< HEAD
import { NavigationContainer  } from '@react-navigation/native';
import Router from './router';
=======
import { NavigationContainer } from '@react-navigation/native';
import Router from './router';
import FlashMessage from "react-native-flash-message";
>>>>>>> master
require('./config/firebase');

export default function App() {
  return (
<<<<<<< HEAD
    
    <NavigationContainer>
      <Router />
    </NavigationContainer>
=======
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
    </>
>>>>>>> master
  );
};

// cd "My Study\Univ Nurdin Hamzah\Semester VIII\Program\MyDoctor"

const styles = StyleSheet.create({});