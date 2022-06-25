import { StyleSheet, View, TextInput } from 'react-native';
import React, {useState} from 'react';
import { colors, fonts } from '../../../utils';
import { Button } from '../../atoms';
import { getDatabase, ref, push, get, set } from '@firebase/database';

export default function InputChat({sender, receiver}) {
    const [form] = useState({
        sender : sender,
        receiver : receiver,
        time:new Date().getTime()
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

    console.log()

    let numOfLinesCompany = 0;

    return (
        <View style={styles.container}>
            <TextInput
                multiline={true}
                numberOfLines={numOfLinesCompany}
                onContentSizeChange={(e)=>{
                    numOfLinesCompany = e.nativeEvent.contentSize.height/18
                }}
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
        color: colors.text.primary,
        // height:0,
        minHeight: 45,
        maxHeight: 100
    },
});