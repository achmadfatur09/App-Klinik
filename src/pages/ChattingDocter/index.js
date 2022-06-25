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
    var lastDate = "";
    
    useEffect(() => {
        get(ref(db, 'users/'+id)).then(res => {
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
                photo={doctor.photo}
                title={doctor.fullName}
                pekerjaan={doctor.profession}
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
                        var newDate = false;

                        const {message, sender, time} = i.val();
                        var timestamp = time;
                        var times = new Date(timestamp).getHours() + ":" + new Date(timestamp).getSeconds();
                        var date = new Date(timestamp).getDate() + "-" + new Date(timestamp).getMonth() + "-" + new Date(timestamp).getFullYear();
                        
                        if (lastDate != date) {
                            newDate = true;
                            lastDate = date;
                        }    
                        return [
                            (newDate == true) ?
                                <Text style={styles.chatDate}>{date}</Text> 
                                : 
                                <View></View>
                            ,
                            (sender == auth.currentUser.uid) ?
                                <ChatItem key={i.key}  isMe message={message} time={times} />
                                : <ChatItem key={i.key} message={message} time={times} />
                        ]
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