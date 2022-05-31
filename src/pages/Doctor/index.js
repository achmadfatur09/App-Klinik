import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,
  Loading
} from '../../components';
import { colors, fonts} from '../../utils';
import {
  JSONCategoryDoctor,
  DummyDoctor1,
  DummyDoctor2,
  DummyDoctor3,
} from '../../assets';

import {getDatabase, ref, get} from 'firebase/database';

export default function Doctor({ navigation }) {
  const [blog, setBlog] = useState();
  const [loadingBlog, setLoadingBlog] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const refDb = ref(db, 'news');

    get(refDb).then((snapshot) => {

      if (snapshot.exists()) {
        let data = [];
        snapshot.forEach((item) => {
          data.push(item);
        })   
        setBlog(data);    
      } else {
        console.log("No data available");
      }

      setLoadingBlog(false)
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
            <Text style={styles.welcome}>Mau Konsultasi Dengan Siapa Hari Ini ?</Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
              <View style={styles.category}>
                <Gap width={32} />
                {
                  JSONCategoryDoctor.data.map(item => {
                    return <DoctorCategory
                      key={item.id}
                      category={item.category}
                      onPress={() => navigation.navigate('ChooseDoctor')}
                    />
                  })
                }
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            <RatedDoctor
              name="Achmad Faturohman"
              desc="Pedriatrician"
              avatar={DummyDoctor1}
              onPress={() => navigation.navigate('DocterProfile')}
            />
            <RatedDoctor
              name="Nurin Naila"
              desc="Dentist"
              avatar={DummyDoctor2}
              onPress={() => navigation.navigate('DocterProfile')}
            />
            <RatedDoctor
              name="Sayyid"
              desc="Podriatrist"
              avatar={DummyDoctor3}
              onPress={() => navigation.navigate('DocterProfile')}
            />
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          <View>
            {loadingBlog && <Loading />}
            {
              blog.map((item) => {
                return <NewsItem 
                  blog={item.val()}
                  key={item.key}
                />
              })
            }

          </View>
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
}

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
