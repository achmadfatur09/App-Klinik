import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { colors, fonts } from '../../../utils';
import { DummyDoctor9 } from '../../../assets';

export default function Other({message, time}) {
    return (
        <View style={styles.container}>
            {/* <Image source={DummyDoctor9} style={styles.avatar} /> */}
            <View>
                <View style={styles.chatContent}>
                    <Text style={styles.text}>{message}</Text>
                </View>
                <Text style={styles.date}>{time}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        alignItems: 'flex-start',
        paddingLeft: 16,
    },
    avatar: {
        height: 30,
        width: 30,
        borderRadius: 30 / 2,
        marginRight: 12,
    },
    chatContent: {
        padding: 12,
        // paddingLeft: 18,
        backgroundColor: colors.primary,
        maxWidth: '80%',
        borderRadius: 10,
        borderBottomLeftRadius: 0,
    },
    text: {
        fontSize: 14,
        fontFamily: fonts.primary.normal,
        color: colors.white,
    },
    date: {
        fontSize: 11,
        fontFamily: fonts.primary.normal,
        color: colors.text.secondary,
        marginTop: 8,
    },
});