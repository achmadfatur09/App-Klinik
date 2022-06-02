import { StyleSheet, View , ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Gap, Header, Profile, ProfileItem } from '../../components';
import { colors, showError } from '../../utils';
import { getDatabase, ref, get } from '@firebase/database';

export default function DocterProfile({ navigation , route}) {
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
        <Header title="Doktor Profile" onPress={() => navigation.goBack()} />
        <Profile
          name={doctor.nama}
          desc={doctor.pekerjaan}
        />
        <Gap height={10} />
        <ProfileItem
          label="Alumnus"
          value={doctor.alumni}
        />
        <ProfileItem
          label="Tempat Praktik"
          value="Klinik drg. Sri Wulansari"
        />
        <ProfileItem
          label="No. STR"
          value={doctor.no_str}
        />
        <View style={styles.action}>
          <Button title="Start Consultation" 
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