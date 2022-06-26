import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import React from 'react';
import { DummyHospital1, DummyHospital2, DummyHospital3, DummyHospital4, ILHospitalBG, JSONHospital } from '../../assets';
import { colors, fonts } from '../../utils';
import { Gap, ListHospital } from '../../components';

export default function Hospitals({navigation}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.page} >
        <ImageBackground source={ILHospitalBG} style={styles.background}>
          <Text style={styles.title}>Kinik drg. Sri Wulansari</Text>
          <Text style={styles.desc}>Jl. Sunan Giri, Suka Karya,</Text>
          <Text style={styles.desc}>Kec. Kota Baru, Kota Jambi, Jambi 36129</Text>
        </ImageBackground>
        <View style={styles.content}>
          <Text style={styles.desc}>Rumah Sakit Rujukan </Text>

          {
            JSONHospital.data.map(item => {
              return <ListHospital
                type={item.type}
                name={item.name}
                address={item.address}
                pic={DummyHospital1}
                onPress={() => navigation.navigate('RsProfile',{id:item.id})}
              />
            })
          }
            <Gap height={160} />
            <Text style={styles.desc}>Nomor Telepon Administrasi : +62 823-7575-7007</Text>
        </View>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  background: {
    height: 240,
    paddingTop: 30,
  },
  title: {
    fontSize: 25,
    fontFamily: fonts.primary[600],
    color: colors.secondary,
    textAlign: 'center',
  },
  desc: {
    fontSize: 15,
    fontFamily: fonts.primary[300],
    color: colors.secondary,
    marginTop: 6,
    textAlign: 'center',
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 1,
    marginTop: -30,
    paddingTop: 14,
  },
});