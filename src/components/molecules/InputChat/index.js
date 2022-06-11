import { StyleSheet, View, TextInput } from 'react-native';
import React, {useState} from 'react';
import { colors, fonts } from '../../../utils';
import { Button } from '../../atoms';
import { getDatabase, ref, push, get, set } from '@firebase/database';

export default function InputChat({sender, receiver}) {
    const [form] = useState({
        sender : sender,
        receiver : receiver
    });
    const [message, setMessage] = useState({})

    const sendChat = () => {
        const data = {...form, ...message};
        const db = getDatabase();
        push(ref(db, 'chats/'), data)
        setMessage('')

        get(ref(db, 'chatlist/'+ sender + '/' + receiver)).then((snapshot) => {
            if(!snapshot.exists()){
                set(ref(db, 'chatlist/'+ sender + '/' + receiver), {id:receiver})
            }
        })
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={message}
                onChangeText={(value) => setMessage({message : value})}
                placeholder="Tulis Pesan Untuk Anda"

            />
            <Button onPress={sendChat} title="Kirim"/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexDirection: 'row',
    },
    input: {
        backgroundColor: colors.disable,
        padding: 14,
        borderRadius: 10,
        flex: 1,
        marginRight: 10,
        fontSize: 14,
        fontFamily: fonts.primary.normal,
        maxHeight: 45,
    },
});