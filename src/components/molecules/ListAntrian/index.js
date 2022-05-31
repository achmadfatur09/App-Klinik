import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors, fonts } from '../../../utils';

export default function ListAntrian({ text, number, name, pekerjaan }) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.address}>{text}</Text>
                <Text style={styles.number}>{number}</Text>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.address}>{pekerjaan}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
    },
    number: {
        fontSize: 100,
        fontFamily: fonts.primary.normal,
        color: colors.text.primary,
        textAlign: 'center',
    },
    title: {
        fontSize: 25,
        fontFamily: fonts.primary.normal,
        color: colors.text.primary,
        textAlign: 'center',
    },
    address: {
        fontSize: 18,
        fontFamily: fonts.primary[300],
        color: colors.text.secondary,
        textAlign: 'center',
        marginTop: 6,
    },
});