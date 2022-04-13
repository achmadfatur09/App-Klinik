import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Header, Profile, List, Gap } from '../../components';
import { colors } from '../../utils';


export default function UserProfile({ navigation }) {
    return (
        <View style={styles.page}>
            <Header
                title="Profile"
                onPress={() => navigation.goBack()}
            />
            <Gap height={10} />
            <Profile
                name="Achmad Faturohman"
                desc="Android Developers"
            />
            <Gap height={14} />
            <List
                name="Edit Profile"
                desc="Last Update Yesterday"
                type="next"
                icon="edit-profile"
                onPress={() => navigation.navigate('UpdateProfile')}
            />
            <List
                name="Edit Profile"
                desc="Last Update Yesterday"
                type="next"
                icon="language"
            />
            <List
                name="Edit Profile"
                desc="Last Update Yesterday"
                type="next"
                icon="rate"
            />
            <List
                name="Edit Profile"
                desc="Last Update Yesterday"
                type="next"
                icon="help"
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