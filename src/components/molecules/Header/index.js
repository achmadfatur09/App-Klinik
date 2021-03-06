import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button, Gap } from '../../atoms';
import { colors, fonts } from '../../../utils';
import DarkProfile from './DarkProfile';

export default function Header({photo, onPress, title, pekerjaan, type }) {
  if (type === 'dark-profile') {
    return <DarkProfile photo={photo} title={title} pekerjaan={pekerjaan} onPress={onPress} />;
  }
  return (
    <View style={styles.container(type)}>
      <Button
        type="icon-only"
        icon={type === 'dark' ? 'back-light' : 'back-dark'}
        onPress={onPress}
      />
      <Text style={styles.text(type)} >{title}</Text>
      <Gap height={24} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: (type) => (
    {
      paddingHorizontal: 16,
      paddingVertical: 30,
      backgroundColor: type === 'dark' ? colors.secondary : colors.white,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomLeftRadius: type === 'dark' ? 20 : 0,
      borderBottomRightRadius: type === 'dark' ? 20 : 0,
    }
  ),
  text: (type) => (
    {
      textAlign: 'center',
      flex: 1,
      fontFamily: fonts.primary[600],
      color: type === 'dark' ? colors.white : colors.text.primary,
    }
  ),
});