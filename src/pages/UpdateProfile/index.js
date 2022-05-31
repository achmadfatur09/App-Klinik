import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Gap, Header, Input, Profile } from '../../components';
import { colors, getData, showError, storeData } from '../../utils';
import { showMessage } from 'react-native-flash-message';
import * as ImagePicker from 'react-native-image-picker';
import { ILNullPhoto } from '../../assets';
import { getAuth, updatePassword } from '@firebase/auth';
import { getDatabase, update, ref } from '@firebase/database';
import { getStorage, ref as refStorage, uploadBytes, getDownloadURL } from '@firebase/storage';

export default function UpdateProfile({ navigation }) {
  const [profile, setProfile] = useState({
    fullName: '',
    umur: '',
    profession: '',
    alamat: '',
    noHp: '',
    email: '',
  });
  const [newPhoto, setNewPhoto] = useState(false);
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setPhoto(data.photo);
      setProfile(data);
    });
  }, []);

  const updateData = () => {
    const data = profile;
    if (password.length > 0) {
      if (password.length < 6) {
        showError('Opps...Password Kurang Dari 6 Karakter');
      } else {
        updateNewPassword().then(() => {
          data.password = password;
          updateProfileData(data);
        }).catch((err) => {
          showMessage({
            message: err.message,
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        })
      }
      navigation.replace('UserProfile');
    } else {
      updateProfileData(data);
      navigation.replace('UserProfile');
    }
  };

  const updateNewPassword = async () => {
    const auth = getAuth().currentUser;
    try {
      await updatePassword(auth, password);
    } catch (err) {
      throw new err;
    }
  };

  const updateProfileData = async (data) => {

    const db = getDatabase();
    const uid = getAuth().currentUser.uid;

    if (newPhoto) {
      data.photo = await uploadPhoto();
    }

    try {
      const updating = await update(ref(db, 'users/' + uid), data);
      if (updating) {
        storeData('user', data);
      }
    } catch (err) {
      showError(err.message);
    }
  };

  const uploadPhoto = async () => {
    const storage = getStorage();
    const referStorage = refStorage(storage, 'profil/' + photoForDB.fileName);

    const respone = await fetch(photoForDB.uri);
    const blob = await respone.blob();
    const uploadPhotoBytes = await uploadBytes(referStorage, blob);

    if (uploadPhotoBytes) {
      // console.log('Uploaded a blob or file!');
      return { uri: await getDownloadURL(referStorage) };
    }
    return false
  }

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    })
  };

  const getImage = () => {
    ImagePicker.launchImageLibrary(
      { mediaTypes: 'Images', quality: 0.2, maxWidth: 200, maxHeight: 200 },
      response => {
        // console.log('respone: ', response);
        if (response.didCancel || response.error) {
          showMessage({
            message: 'opps, seperinya tidak jadi memilih foto',
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        } else {

          const source = { uri: response.assets[0].uri };
          setPhoto(source);
          setPhotoForDB(response.assets[0]);
          setNewPhoto(true);
        }
      },
    )
  };
  return (
    <View style={styles.page}>
      <Header
        title="Edit Profile"
        onPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove onPress={getImage} photo={photo} />
          <Gap height={5} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={(value) => changeText('fullName', value)} />
          <Gap height={2} />
          <Input
            label="Umur"
            value={profile.umur}
            onChangeText={(value) => changeText('umur', value)} />
          <Gap height={2} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={(value) => changeText('profession', value)} />
          <Gap height={2} />
          <Input
            label="Alamat"
            value={profile.alamat}
            onChangeText={(value) => changeText('alamat', value)} />
          <Gap height={2} />
          <Input
            label="No HP"
            value={profile.noHp}
            onChangeText={(value) => changeText('noHp', value)} />
          <Gap height={2} />
          <Input
            label="Email"
            value={profile.email} disable
          />
          <Gap height={2} />
          <Input
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <Gap height={40} />
          <Button
            title="Save Profile"
            onPress={updateData}
          />
        </View>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});