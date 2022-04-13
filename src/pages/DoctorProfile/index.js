import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button, Gap, Header, Profile, ProfileItem } from '../../components';
import { colors } from '../../utils';

export default function DocterProfile({ navigation }) {
  return (
    <View style={styles.page}>
      <Header title="Doktor Profile" onPress={() => navigation.goBack()} />
      <Profile
        name="Achmad Faturohman"
        desc="Dokter Umum"
      />
      <Gap height={10} />
      <ProfileItem
        label="Alumnus"
        value="Universitas Jambi, 2020"
      />
      <ProfileItem
        label="Tempat Praktik"
        value="Klinik drg. Sri Wulansari"
      />
      <ProfileItem
        label="No. STR"
        value="1234567890"
      />
      <View style={styles.action}>
        <Button title="Start Consultation" 
        onPress={() => navigation.navigate('Chatting')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  action: {
    paddingHorizontal: 40,
    paddingTop: 23,
  },
})