import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ChatItem, Header, InputChat } from '../../components';
import { colors, fonts, showError } from '../../utils';
import { getDatabase, ref, get } from '@firebase/database';

export default function Chatting({ navigation, route }) {
    const {id} = route.params;
    const [doctor, setDoctor] = useState([]);
    
    useEffect(() => {
        const db = getDatabase();
        get(ref(db, 'dokter/'+id)).then(res => {
        if (res.val()) {
            setDoctor(res.val());
        }
        }).catch(err => {
        showError(err.message);
        })
    }, [])

    return (
        <View style={styles.page}>
            <Header
                type="dark-profile"
                title={doctor.nama}
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
};

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
});