import { StyleSheet, View , ScrollView, Linking} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Gap, Header, Profile, ProfileItem } from '../../components';
import { colors, showError } from '../../utils';
import RumahSakit from '../../components/molecules/RumahSakit';
import { DummyHospital1, JSONHospital } from '../../assets';

export default function RsProfile({ navigation , route}) {
  const {id} = route.params;

  const rs =JSONHospital.data.filter(i => i.id==id);

  return (
    <ScrollView>
      <View style={styles.page}>
        <Header title="Profile Rumah Sakit" onPress={() => navigation.goBack()} />
        <RumahSakit
          name={rs[0].name}
          desc={rs[0].type}
          photo={DummyHospital1}
        />
        <Gap height={10} />
        <ProfileItem
          label="Rumah Sakit Umum"
          value={rs[0].type}
        />
        <ProfileItem
          label="Alamat Rumah Sakit"
          value={rs[0].address}
        />
        <ProfileItem
          label="No. HP Rumah Sakit"
          value={rs[0].phone}
        />
        <View style={styles.action}>
          <Button title="Call Rumah Sakit"
          // langsung ke arah diall hp
          onPress={()=>{Linking.openURL('tel:'+ rs[0].phone)}}
          />
        </View>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  action: {
    paddingHorizontal: 40,
    paddingTop: 23,
  },
});