import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Button, Gap, Header, Input, Loading } from '../../components';
import { colors, showError, storeData, useForm } from '../../utils';
import { getDatabase, ref, push } from '@firebase/database';

export default function RekamMedis({ navigation, route }) {
    const {nama} = route.params;
    
    const [form, setForm] = useForm({
        dokter:nama
    });

    const [loading, setLoading] = useState(false);

    const onContinue = () => {

        setLoading(true);
        const db = getDatabase();

        if(push(ref(db, 'rekammedis/'), form)){
            navigation.goBack();
        }else{
            setLoading(false);
        }
    };
    return (
        <>
            <View style={styles.page}>
                <Header
                    onPress={() => navigation.goBack()}
                    title="Rekam Medis"
                />
                <View style={styles.content}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Input
                            label="Full Name"
                            value={form.fullName}
                            onChangeText={value => setForm('fullName', value)}
                        />
                        <Gap height={24} />
                        <Input
                            label="Waktu"
                            value={form.date}
                            onChangeText={value => setForm('date', value)}
                        />
                        <Gap height={24} />
                        <Input
                            label="Alamat"
                            value={form.alamat}
                            onChangeText={value => setForm('alamat', value)}
                        />
                        <Gap height={24} />
                        <Input
                            label="No Hp"
                            value={form.noHp}
                            onChangeText={value => setForm('noHp', value)}
                        />
                        <Input
                            label="Dokter"
                            value={form.dokter}
                            onChangeText={value => setForm('dokter', value)}
                        />
                        <Gap height={24} />
                        <Input
                            label="Konsultasi"
                            value={form.konsultasi}
                            onChangeText={value => setForm('konsultasi', value)}
                        />
                        <Gap height={24} />
                        <Button
                            title="Sent"
                            onPress={onContinue}
                        />
                        <Gap height={54} />
                    </ScrollView>
                </View>
            </View>
            {loading && <Loading />}
        </>
    );
};

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1,
    },
    content: {
        padding: 40,
        paddingTop: 0,
    }
});