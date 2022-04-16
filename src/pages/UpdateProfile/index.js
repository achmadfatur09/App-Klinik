import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Gap, Header, Input, Profile } from '../../components';
import { colors, getData, storeData } from '../../utils';
import { showMessage } from '../../utils/showMessage';
import ImagePicker from 'react-native-image-picker';
import { ILNullPhoto } from '../../assets';

export default function UpdateProfile({ navigation }) {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
  });
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setPhoto({ uri: res.photo });
      setProfile(data);
    });
  }, []);

  const update = () => {
    console.log('profile: ', profile);
    console.log('new Password: ', password);

    if (password.length > 0) {
      if (password.length < 6) {
        showMessage({
          message: 'Opps...Password Kuang Dari 6 Karakter',
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      } else {
        updatePassword();
        updateProfileData();
        navigation.replace('MainApp');
      }
    } else {
      updateProfileData();
      navigation.replace('MainApp');
    }
  };

  const updatePassword = () => {
    auth().onAuthStateChange(user => {
      if (user) {
        user.updatePassword(password).catch(err => {
          showMessage({
            message: err.message,
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        });
      }
    });
  };

  const updateProfileData = () => {
    const data = profile;
    data.photo = photoForDB;
    auth.database()
      .ref(`user/${profile.uid}/`)
      .update(data)
      .then(() => {
        console.log('success: ', data);
        storeData('user', data);
      })
      .catch(err => {
        showMessage({
          message: err.message,
          type: 'default',
          backgroundColor: colors.error,
          collor: colors.white,
        });
      });
  }

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    })
  };

  const getImage = () => {
    ImagePicker.launchImageLibrary(
      { mediaTypes: 'Images', quality: 0.5, maxWidth: 200, maxHeight: 200 },
      response => {
        console.log('respone: ', response);
        if (response.didCancel || response.error) {
          showMessage({
            message: 'opps, seperinya tidak jadi memilih foto',
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        } else {
          // const setPhotoForDB = `data:${response.type};base64, ${response.data}`;

          const source = { uri: response.assets[0].uri };
          setPhoto(source);
          setPhotoForDB(response.assets[0]);
          // setHasPhoto(true);
        }
      },
    )
  }
  return (
    <View style={styles.page}>
      <Header
        title="Edit Profile"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <Profile isRemove photo={photo} onPress={getImage} /> */}
          <Profile isRemove onPress={getImage} />
          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}

            onChangeText={(value) => changeText('fullName', value)} />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={(value) => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input
            label="Email"
            value={profile.email} disable
          />
          <Gap height={24} />
          <Input
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <Gap height={40} />
          <Button
            title="Save Profile"
            onPress={() => navigation.goBack('UserProfile')}
          />
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
})