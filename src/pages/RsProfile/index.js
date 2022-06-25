import { StyleSheet, View , ScrollView, Linking} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Gap, Header, Profile, ProfileItem } from '../../components';
import { colors, showError } from '../../utils';
import RumahSakit from '../../components/molecules/RumahSakit';
import { DummyHospital1, JSONHospital } from '../../assets';

export default function RsProfile({ navigation , route}) {
  const {id} = route.params;
  const [Rs, setRS] = useState({});

  useEffect(() => {
    setRS(JSONHospital.data.filter(i => i.id==id))
  }, [])

  return (
    <ScrollView>
      <View style={styles.page}>
        <Header title="Profile Rumah Sakit" onPress={() => navigation.goBack()} />
        <RumahSakit
          name={Rs[0].name}
          desc={Rs[0].type}
          photo={DummyHospital1}
        />
        <Gap height={10} />
        <ProfileItem
          label="Rumah Sakit Umum"
          value={Rs[0].type}
        />
        <ProfileItem
          label="Alamat Rumah Sakit"
          value={Rs[0].address}
        />
        <ProfileItem
          label="No. HP Rumah Sakit"
          value={Rs[0].phone}
        />
        <View style={styles.action}>
          <Button title="Call Rumah Sakit"
          // langsung ke arah diall hp
          onPress={()=>{Linking.openURL('tel:'+ Rs[0].phone)}}
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