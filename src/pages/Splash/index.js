import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import { ILLogo } from '../../assets';
import { colors, fonts } from '../../utils';
import { getAuth } from '@firebase/auth';

export default function Splash({ navigation }) {
    useEffect(() => {
        const unsubscribe = getAuth().onAuthStateChanged((user) => {
            setTimeout(() => {
                if (user) {
                    // user sedang login
                    navigation.replace('MainApp');
                } else {
                    // user logout
                    navigation.replace('GetStarted');
                }
            }, 2000);
        });

        return () => unsubscribe();
    }, [navigation])
    return (
        <View style={styles.page}>
            <ILLogo />
            <Text
                style={styles.title}>
                Aplikasi Kesehatan
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        marginTop: 20,
    }
});
