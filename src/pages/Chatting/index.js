import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ChatItem, Header, InputChat } from '../../components'
import { colors, fonts } from '../../utils'

export default function Chatting({ navigation }) {
    return (
        <View style={styles.page}>
            <Header
                type="dark-profile"
                title="Achmad Faturohman"
                onPress={() => navigation.goBack()}
            />
            <Text style={styles.chatDate}>Senin, 4 April 2022</Text>
            <View style={styles.content}>
                <ChatItem isMe />
                <ChatItem />
                <ChatItem isMe />
            </View>
            <InputChat />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1,
    },
    content: {
        flex: 1,
    },
    chatDate: {
        fontSize: 11,
        fontFamily: fonts.primary.normal,
        color: colors.text.secondary,
        marginVertical: 20,
        textAlign: 'center',
    },
})