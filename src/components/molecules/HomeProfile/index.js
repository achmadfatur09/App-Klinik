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
            const data = res;
            data.photo = { uri: (data.photo === undefined) ? ILNullPhoto : data.photo };
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
                <Text style={styles.name}>{profile.role == 3 ? profile.fullName : profile.nama}</Text>
                <Text style={styles.profession}>{profile.role == 3 ? profile.profession : profile.pekerjaan}</Text>
            </View>
        </TouchableOpacity>
    )
};

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
        fontSize: 18,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        textTransform: 'capitalize',
    },
    profession: {
        fontSize: 14,
        fontFamily: fonts.primary[400],
        color: colors.text.secondary,
        textTransform: 'capitalize',
    },
});