import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import { ILHospitalBG } from '../../assets';
import { colors, fonts } from '../../utils';
import { Button, Gap, ListAntrian } from '../../components';

export default function Antrian() {
  return (
    <View style={styles.page} >
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}>Kinik drg. Sri Wulansari</Text>
        <Text style={styles.desc}>Jl. Sunan Giri, Suka Karya,</Text>
        <Text style={styles.desc}>Kec. Kota Baru, Kota Jambi, Jambi 36129</Text>
      </ImageBackground>
      <View style={styles.content}>
        <ListAntrian
          text="Nomer Antrian"
          number="09"
          name="Achmad Faturohman"
          pekerjaan="Mahasiswa"
        />
        <Gap height={100} />
        <Text style={styles.note}>
          Terima Kasih Atas Kunjungan Anda.
        </Text>
        <View style={styles.action}>
          <Button title="Klik Untuk Antrian"
          />
        </View>
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
  note: {
    fontSize: 20,
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
  action: {
    paddingHorizontal: 40,
    paddingTop: 23,
  },
});