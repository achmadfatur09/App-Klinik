import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Button, Gap, Header, Link } from '../../components';
import { IconAddPhoto, IconRemovePhoto, ILNullPhoto } from '../../assets';
import { colors, fonts } from '../../utils';
import * as ImagePicker from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';
import { getAuth } from '@firebase/auth';
import { getDatabase, ref, update } from '@firebase/database';
import { getStorage, ref as refStorage, uploadBytes } from '@firebase/storage';

export default function UploadPhoto({ navigation, route }) {
    const { fullName, profession } = route.params;
    const [photoForDB, setPhotoForDB] = useState('');
    const [hasPhoto, setHasPhoto] = useState(false);
    const [photo, setPhoto] = useState(ILNullPhoto);
    const getImage = () => {
        ImagePicker.launchImageLibrary({ mediaTypes:'Images', }, response => {
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
                setPhotoForDB(response.assets[0])
                setHasPhoto(true);
            }
        });
    };
    
    const uploadAndContinue = async () => {
        const db = getDatabase();
        const uid = getAuth().currentUser.uid;
        const storage = getStorage();

        const referStorage = refStorage(storage, 'profil/' + photoForDB.fileName);

        const respone = await fetch(photoForDB.uri);
        const blob = await respone.blob();
        uploadBytes(referStorage, blob).then(snapshot => {
            console.log('Uploaded a blob or file!');
            update(ref(db, 'users/'+uid), {
                    photo: photoForDB.fileName,
                }
            )
        })
        // navigation.replace('MainApp');
    }
    return (
        <View style={styles.page}>
            <Header
                onPress={() => navigation.goBack()}
                title={"Upload Photo"}
            />
            <View style={styles.content}>
                <View style={styles.profile}>
                    <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
                        <Image
                            source={photo}
                            style={styles.avatar}
                        />
                        {hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
                        {!hasPhoto && <IconAddPhoto style={styles.addPhoto} />}
                    </TouchableOpacity>

                    <Text style={styles.name}> {fullName} </Text>
                    <Text style={styles.profession}> {profession} </Text>
                </View>
                <View>
                    <Button
                        disable={!hasPhoto}
                        title="Upload and Continue"
                        onPress={uploadAndContinue}
                    />
                    <Gap height={30} />
                    <Link
                        title="Skip for this"
                        align="center"
                        size={16}
                        onPress={() => navigation.replace('MainApp')}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.white,
    },
    content: {
        paddingHorizontal: 40,
        paddingBottom: 60,
        flex: 1,
        justifyContent: 'space-between',
    },
    profile: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 110 / 2,
    },
    avatarWrapper: {
        width: 130,
        height: 130,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 130 / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addPhoto: {
        position: 'absolute',
        bottom: 8,
        right: 6,
    },
    name: {
        fontSize: 24,
        color: colors.text.primary,
        fontFamily: fonts.primary[600],
        textAlign: 'center'
    },
    profession: {
        fontSize: 18,
        fontFamily: fonts.primary.normal,
        textAlign: 'center',
        color: colors.text.secondary,
        marginTop: 4,
    }
})