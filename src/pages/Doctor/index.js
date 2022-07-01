import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,
  Loading
} from '../../components';
import { colors, fonts, getData, showError } from '../../utils';
import {
  JSONCategoryDoctor,
  DummyDoctor1,
  DummyDoctor2,
  DummyDoctor3,
} from '../../assets';
import { getDatabase, ref, get } from '@firebase/database';


export default function Doctor({ navigation }) {
  const db = getDatabase();
  const [news, setNews] = useState([]);
  const [doctor, setDoctor] = useState([]);

  const [profile, setProfile] = useState({});
    useEffect(() => {
        getData('user').then(res => {
            const data = res;
            setProfile(data);
        });
    }, [])

  useEffect(() => {
    
    get(ref(db, 'news/')).then(res => {
      // console.log('data: ',res);
      let data = []
      if (res.val()) {
        res.forEach(v => data.push(v))
        setNews(data);
      }
    }).catch(err => {
      showError(err.message);
    })
  }, []);

  useEffect(() => {
    get(ref(db, 'docter/')).then(res => {
      // console.log('data: ',res);
      let data = []
      if (res.val()) {
        res.forEach(v => {
          data.push(v);
        })
        setDoctor(data);
      }
    }).catch(err => {
      showError(err.message);
    })
  }, [])

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
            {
              profile.role == 3 &&
              <Text style={styles.welcome}>Mau Konsultasi Dengan Siapa Hari Ini..?</Text>
            }
          </View>
          {
            profile.role == 3 &&
            <View style={styles.wrapperScroll}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <View style={styles.category}>
                  <Gap width={32} />
                  {
                    JSONCategoryDoctor.data.map(item => {
                      return <DoctorCategory
                        key={item.id}
                        category={item.category}
                        onPress={() => navigation.navigate('ChooseDoctor', {category:item.category})}
                      />
                    })
                  }
                  <Gap width={22} />
                </View>
              </ScrollView>
            </View>
          }
          
          {
            profile.role == 3 &&
            <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {
              doctor.map(i => {
                return (
                  <RatedDoctor
                    key={i.key}
                    name={i.val().nama}
                    desc={i.val().pekerjaan}
                    avatar={i.val().photo}
                    onPress={() => navigation.navigate('DocterProfile',{id:i.key})}
                  />
                )
              })
              
            }

          </View>
          }

          {
            profile.role == 2 &&
            <TouchableOpacity onPress={()=>navigation.navigate('RekamMedis',{nama:profile.nama})}>
              <View style={styles.wrapperSection}>
                <Text style={styles.sectionLabel}>Rekam Medis</Text>
              </View>
            </TouchableOpacity>
          }

          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
            {
              news.map(item => {
                return (
                  <NewsItem
                    key={item.key}
                    title={item.val().title}
                    date={item.val().date}
                    image={item.val().image}
                    onPress={() => navigation.navigate('Content',{id:item.key})}
                  />
                )
              })
            }
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.text.primary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 25,
    marginBottom: 16,
    maxWidth: 230,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperScroll: {
    marginHorizontal: -16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  }
});
