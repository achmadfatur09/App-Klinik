import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Header, Profile, List, Gap } from '../../components';
import { colors, getData, removeData } from '../../utils';
import { ILNullPhoto } from '../../assets';
import {getAuth,signOut} from '@firebase/auth';


export default function UserProfile({ navigation }) {
    const [profile, setProfile] = useState({
        fullName: '',
        profession: '',
        photo: ILNullPhoto,
    });
    useEffect(() => {
        getData('user').then(res => {
            const data = res;
            data.photo = { uri: (data.photo === undefined) ? ILNullPhoto : data.photo };
            setProfile(data);
        });
    }, [])

    const logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            removeData('user').then((result)=>{
                console.log('result',result)
                navigation.replace('Splash')
            })
        })
    }

    return (
        <View style={styles.page}>
            <Header
                title="Profile"
                onPress={() => navigation.goBack()}
            />
            <Gap height={10} />
            {profile.fullName.length > 0 &&
                <Profile
                    name={profile.fullName}
                    desc={profile.profession}
                    photo={profile.photo.uri}
                />}

            <Gap height={14} />
            <List
                name="Edit Profile"
                desc="Last Update Yesterday"
                type="next"
                icon="edit-profile"
                onPress={() => navigation.navigate('UpdateProfile')}
            />
            <List
                name="Language"
                desc="Last Update Yesterday"
                type="next"
                icon="language"
            />
            <List
                name="Give Us Rate"
                desc="Last Update Yesterday"
                type="next"
                icon="rate"
            />
            <List
                name="Logout"
                desc="Last Update Yesterday"
                type="next"
                icon="help"
                onPress={logout}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.white,
    },
})