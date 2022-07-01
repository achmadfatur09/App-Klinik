import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Button, Gap, Header, Input, Loading } from '../../components';
import { colors, showError, storeData, useForm } from '../../utils';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { getDatabase, ref, set } from '@firebase/database';

export default function RekamMedis({ navigation }) {

    const [form, setForm] = useForm({
        fullName: '',
        profession: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);

    function writerUserData(data, uid) {
        const db = getDatabase();
        set(ref(db, 'users/'+uid), data);
        storeData('user', data);
    };

    const onContinue = () => {

        setLoading(true);
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((success) => {
                const uid = auth.currentUser.uid
                setLoading(false);
                setForm('reset');
                writerUserData(form, uid);
                navigation.navigate('UploadPhoto', form);
            })
            .catch((error) => {
                const errorMessage = error.message;
                setLoading(false);
                showError('The email address is already in use by another account.');
            });
    };
    return (
        <>
            <View style={styles.page}>
                <Header
                    onPress={() => navigation.goBack()}
                    title="Daftar Akun"
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