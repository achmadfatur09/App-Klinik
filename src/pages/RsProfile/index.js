import { StyleSheet, View , ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Gap, Header, Profile, ProfileItem } from '../../components';
import { colors, showError } from '../../utils';
import { getDatabase, ref, get } from '@firebase/database';
import RumahSakit from '../../components/molecules/RumahSakit';

export default function RsProfile({ navigation , route}) {
  const {id} = route.params;
  const [doctor, setDoctor] = useState([]);
  
  useEffect(() => {
    const db = getDatabase();
    get(ref(db, 'docter/'+id)).then(res => {
      if (res.val()) {
        setDoctor(res.val());
      }
    }).catch(err => {
      showError(err.message);
    })
  }, [])

  return (
    <ScrollView>
      <View style={styles.page}>
        <Header title="Profile Rumah Sakit" onPress={() => navigation.goBack()} />
        <RumahSakit
          name={doctor.nama}
          desc={doctor.pekerjaan}
        />
        <Gap height={10} />
        <ProfileItem
          label="Rumah Sakit Umum"
          value={doctor.alumni}
        />
        <ProfileItem
          label="Alamat Rumah Sakit"
          value={doctor.tempat_praktik}
        />
        <ProfileItem
          label="No. HP Rumah Sakit"
          value={doctor.no_str}
        />
        <View style={styles.action}>
          <Button title="Call Rumah Sakit"
          // langsung ke arah diall hp
          onPress={() => navigation.navigate('Chatting', {id:id})}
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