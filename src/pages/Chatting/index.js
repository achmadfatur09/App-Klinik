import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { ChatItem, Header, InputChat } from '../../components';
import { colors, fonts, showError } from '../../utils';
import { getAuth} from '@firebase/auth';
import { getDatabase, ref, get, onValue } from '@firebase/database';
import { ScrollView } from 'react-native-gesture-handler';

export default function Chatting({ navigation, route }) {
    const {id} = route.params;
    const auth = getAuth();
    const [doctor, setDoctor] = useState([]);
    const [chat, setChat] = useState([]);
    const db = getDatabase();
    const scrollViewRef = useRef();
    
    useEffect(() => {
        get(ref(db, 'docter/'+id)).then(res => {
        if (res.val()) {
            setDoctor(res.val());
        }
        }).catch(err => {
        showError(err.message);
        })
    }, [])

    useEffect(() => {
        onValue(ref(db, 'chats/'),(snapshot) => {
            let data = []
            snapshot.forEach(i=> {
                if(i.val().sender == auth.currentUser.uid && i.val().receiver == id || i.val().sender == id && i.val().receiver == auth.currentUser.uid){
                    data.push(i);
                }
            })
            setChat(data);
        })
    },[])
    
    return (
        <View style={styles.page}>
            <Header
                type="dark-profile"
                title={doctor.nama}
                pekerjaan={doctor.pekerjaan}
                onPress={() => navigation.goBack()}
            />
            {/* <Text style={styles.chatDate}>Senin, 4 April 2022</Text> */}
            <ScrollView 
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated:true})}
                >
                <View style={styles.content}>
                {
                    chat.map(i=> {
                        const {message, sender} = i.val();
                        
                        return (
                            (sender == auth.currentUser.uid) ?
                                <ChatItem key={i.key}  isMe message={message} />
                                : <ChatItem key={i.key} message={message} />
                            )
                    })
                }
                
                </View>
            </ScrollView>
            <InputChat sender={auth.currentUser.uid} receiver={id}/>
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