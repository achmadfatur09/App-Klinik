import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { ChatItem, Gap, Header, InputChat } from '../../components';
import { colors, fonts, showError } from '../../utils';
import { getAuth} from '@firebase/auth';
import { getDatabase, ref, get, onValue } from '@firebase/database';
import { ScrollView } from 'react-native-gesture-handler';

export default function Content({ navigation, route }) {
    const {id} = route.params;
    const [news, setNews] = useState([]);
    const [chat, setChat] = useState([]);
    const db = getDatabase();
    const scrollViewRef = useRef();
    
    useEffect(() => {
        get(ref(db, 'news/'+id)).then(res => {
        if (res.val()) {
            setNews(res.val());
        }
        }).catch(err => {
        showError(err.message);
        })
    }, [])

    console.log(news);

    return (
        <View style={styles.page}>
            <Header
                photo={{uri:news.image}}
                type="dark-profile"
                title={news.title}
                // pekerjaan={news.pekerjaan}
                onPress={() => navigation.goBack()}
            />
            <Text style={styles.chatDate}>{news.date}</Text>
            <ScrollView>
                <View style={styles.content}>
                    <Text>{news.description}</Text>
                </View>
            </ScrollView>
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