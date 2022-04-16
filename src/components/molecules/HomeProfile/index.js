import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ILNullPhoto } from '../../../assets';
import { colors, fonts, getData } from '../../../utils';

export default function HomeProfile({ onPress }) {
    const [profile, setProfile] = useState({
        photo: ILNullPhoto,
        fullName: '',
        profession: '',
    });

    useEffect(() => {
        getData('user').then(res => {
            // console.log('data user: ', res);
            const data = res;
            data.photo = { uri: (data.photo === undefined) ? ILNullPhoto : data.photo };
            console.log('new profile: ', data);
            setProfile(res);
        }).catch(e => {

        });
    }, []);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image
                source={profile.photo.uri}
                style={styles.avatar}
            />
            <View>
                <Text style={styles.name}>{profile.fullName}</Text>
                <Text style={styles.profession}>{profile.profession}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 46 / 2,
        margin: 12,
    },
    name: {
        fontSize: 16,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        textTransform: 'capitalize',
    },
    profession: {
        fontSize: 12,
        fontFamily: fonts.primary[400],
        color: colors.text.secondary,
        textTransform: 'capitalize',
    },
})