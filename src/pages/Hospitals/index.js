import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import { DummyHospital1, DummyHospital2, DummyHospital3, ILHospitalBG } from '../../assets'
import { colors, fonts } from '../../utils';
import { ListHospital } from '../../components';


export default function Hospitals() {
  return (
    <View style={styles.page} >
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}>Kinik dg. Sri Wulansari</Text>
        <Text style={styles.desc}>3 Tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        <ListHospital
          type="Rumah Sakit"
          name="Rumah Sakit Bayangkara"
          address="Jl. Sunan Giri, Kota Jambi"
          pic={DummyHospital1}
        />
        <ListHospital
          type="Rumah Sakit Anak"
          name="Rumah Sakit Raden Mattaher"
          address="Jl. Sunan Giri, Kota Jambi"
          pic={DummyHospital2} />
        <ListHospital
          type="Rumah Sakit Umum"
          name="Rumah Sakit Abdul Manap"
          address="Jl. Sunan Giri, Kota Jambi"
          pic={DummyHospital3} />
      </View>
    </View>
  )
}

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
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
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
})