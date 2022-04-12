import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './router';
import FlashMessage from "react-native-flash-message";
require('./config/firebase');

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
    </>
  );
};

// cd "My Study\Univ Nurdin Hamzah\Semester VIII\Program\MyDoctor"

const styles = StyleSheet.create({});