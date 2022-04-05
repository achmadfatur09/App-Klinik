import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import { ILLogo } from '../../assets';
import { colors, fonts } from '../../utils';

export default function Splash({navigation}) {
    useEffect( () => {
        setTimeout(() => {
            navigation.replace('GetStarted')
        }, 2000)
    },[])
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