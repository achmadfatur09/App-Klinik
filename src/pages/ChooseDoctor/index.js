import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Header, List } from '../../components';
import { DummyDoctor1, DummyDoctor2 } from '../../assets';
import { colors, showError } from '../../utils';
import { getDatabase, ref, get } from '@firebase/database';

export default function ChooseDoctor({ navigation, route }) {
    const {category} = route.params;
    const [doctor, setDoctor] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        get(ref(db, 'docter/')).then(res => {
            // console.log(res)
        if (res.val()) {
            let data = [];
            res.forEach(i => {
                if (i.val().pekerjaan == category) {
                    data.push(i);
                }
            })
            
            setDoctor(data);
        }
        }).catch(err => {
        showError(err.message);
        })
    }, [])
    
    return (
        <View style={styles.page}>
            <Header
                type="dark"
                title={"Pilih "+ category}
                onPress={() => navigation.goBack()}
            />
            {
                doctor.map((i) => {
                    return (
                        <List
                            key={i.key}
                            type="next"
                            profile={DummyDoctor1}
                            name={i.val().nama}
                            desc={i.val().pekerjaan}
                            onPress={() => navigation.navigate('Chatting',{id:i.key})}
                        />
                    )
                })
            }
        </View>
    )
};

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1,
    },
});