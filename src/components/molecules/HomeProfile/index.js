import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { DummyUser } from '../../../assets'
import { colors, fonts } from '../../../utils'

export default function HomeProfile({onPress}) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image
                source={DummyUser}
                style={styles.avatar}
            />
            <View>
                <Text style={styles.name}>Achmad Faturohman</Text>
                <Text style={styles.profession}>Android Devepors</Text>
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
    },
    profession: {
        fontSize: 12,
        fontFamily: fonts.primary[400],
        color: colors.text.secondary,
    },
})