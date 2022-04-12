<<<<<<< HEAD
import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Button, Gap, Header, Link } from '../../components'
import { IconAddPhoto, ILNullPhoto } from '../../assets';
import { colors, fonts } from '../../utils';

export default function UploadPhoto({ navigation }) {
=======
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Button, Gap, Header, Link } from '../../components'
import { IconAddPhoto, IconRemovePhoto, ILNullPhoto } from '../../assets';
import { colors, fonts } from '../../utils';
import { ImagePicker, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';

export default function UploadPhoto({ navigation }) {
    const [hasPhoto, setHasPhoto] = useState(false);
    const [photo, setPhoto] = useState(ILNullPhoto);
    const getImage = () => {
        ImagePicker.launchImageLibrary({}, response => {
            console.log('respone: ', response);
            if (response.didCancel || response.error) {
                showMessage({
                    message: 'opps, seperinya tidak jadi memilih foto',
                    type: 'default',
                    backgroundColor: colors.error,
                    color: colors.white,
                });
            } else {
                const source = { uri: response.uri };
                setPhoto(source);
                setHasPhoto(true);
            }
        });
    };
>>>>>>> master
    return (
        <View style={styles.page}>
            <Header
                onPress={() => navigation.goBack()}
                title={"Upload Photo"}
            />
            <View style={styles.content}>
                <View style={styles.profile}>
<<<<<<< HEAD
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={ILNullPhoto}
                            style={styles.avatar}
                        />
                        <IconAddPhoto
                            style={styles.addPhoto}
                        />
                    </View>
=======
                    <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
                        <Image
                            source={photo}
                            style={styles.avatar}
                        />
                        {hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
                        {!hasPhoto && <IconAddPhoto style={styles.addPhoto} />}
                    </TouchableOpacity>
>>>>>>> master
                    <Text style={styles.name}>
                        Achmad Faturohman
                    </Text>
                    <Text style={styles.profession}>
                        Android Developers
                    </Text>
                </View>
                <View>
                    <Button
<<<<<<< HEAD
=======
                        disable={!hasPhoto}
>>>>>>> master
                        title="Upload and Continue"
                        onPress={() => navigation.replace('MainApp')}
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
<<<<<<< HEAD
=======
        borderRadius: 110 / 2,
>>>>>>> master
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