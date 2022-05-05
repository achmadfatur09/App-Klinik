import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import { DummyHospital1, DummyHospital2, DummyHospital3, DummyHospital4, ILHospitalBG } from '../../assets';
import { colors, fonts } from '../../utils';
import { Gap, ListHospital } from '../../components';

export default function Hospitals() {
  return (
    <View style={styles.page} >
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}>Kinik drg. Sri Wulansari</Text>
        <Text style={styles.desc}>Jl. Sunan Giri, Suka Karya,</Text>
        <Text style={styles.desc}>Kec. Kota Baru, Kota Jambi, Jambi 36129</Text>
      </ImageBackground>
      <View style={styles.content}>
        <Text style={styles.desc}>Rumah Sakit Rujukan</Text>
        <ListHospital
          type="Rumah Sakit Umum"
          name="RS Islam Arafah"
          address="Jl. Mpu Gandring No.1 Kebun Jeruk Kota Jambi"
          pic={DummyHospital1}
        />
        <ListHospital
          type="Rumah Sakit Umum"
          name="RS Baiturrahim Jambi"
          address="Jl. Prof. M. Yamin, No.30 Kel. Lebak Bandung Kota Jambi"
          pic={DummyHospital2} />
        <ListHospital
          type="Rumah Sakit Umum"
          name="RSUD Raden Mattaher"
          address="Jl. Letjen Suprapto 31, Jambi"
          pic={DummyHospital3} />
          <ListHospital
          type="Rumah Sakit Umum"
          name="RSUD Abdul Manap Jambi"
          address="Jl. SK.Rd.Syahbuddin Kec.Kota Baru Jambi"
          pic={DummyHospital4} />
          <Gap height={160} />
          <Text style={styles.desc}>Nomor Telepon Administrasi : +62 823-7575-7007</Text>
      </View>
    </View>
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