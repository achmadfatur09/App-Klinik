import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { ILCatObat, ILCatPsikiater, ILCatUmum } from '../../../assets';
import { colors, fonts } from '../../../utils';

export default function DoctorCategory({ category, onPress }) {
    const Icon = () => {
        if (category === 'Dokter Umum') {
            return <ILCatUmum styles={styles.illustration} />;
        }
        if (category === 'Dokter Anak') {
            return <ILCatPsikiater styles={styles.illustration} />;
        }
        if (category === 'Dokter Gigi') {
            return <ILCatObat styles={styles.illustration} />;
        }
        return <ILCatUmum styles={styles.illustration} />;
    };
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Icon />
            <Text style={styles.label}>Saya butuh</Text>
            <Text style={styles.category}>{category}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: colors.cardLight,
        alignSelf: 'flex-start',
        borderRadius: 10,
        marginRight: 10,
        width: 100,
        height: 130,
    },
    illustration: {
        marginBottom: 20,
    },
    label: {
        fontSize: 12,
        fontFamily: fonts.primary[300],
        color: colors.text.primary,
    },
    category: {
        fontSize: 12,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        textTransform: 'capitalize',
    }
});