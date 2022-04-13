import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Button, Gap, Header, Input, Loading } from '../../components';
import { colors, storeData, useForm } from '../../utils';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { getDatabase, ref, push } from '@firebase/database';
import { showMessage } from "react-native-flash-message";

export default function Register({ navigation }) {

    const [form, setForm] = useForm({
        fullName: '',
        profession: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);

    function writerUserData(data) {
        const db = getDatabase();
        push(ref(db, 'users/'), data);

        // getData('user').then(res => {
        //     console.log('data: ', res);
        // });
        storeData('user', data);

    }

    const onContinue = () => {

        setLoading(true);
        createUserWithEmailAndPassword(getAuth(), form.email, form.password)
            .then((success) => {
                setLoading(false);
                setForm('reset');
                console.log('register success: ', success);
                writerUserData(form);
                navigation.navigate('UploadPhoto', data);
            })
            .catch((error) => {
                const errorMessage = error.message;
                setLoading(false);
                showMessage({
                    // message: errorMessage,
                    message: 'The email address is already in use by another account.',
                    type: 'default',
                    backgroundColor: colors.error,
                    color: colors.white,
                });
                console.log('error: ', error);
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
                            label="Pekerjaan"
                            value={form.profession}
                            onChangeText={value => setForm('profession', value)}
                        />
                        <Gap height={24} />
                        <Input
                            label="Email"
                            value={form.email}
                            onChangeText={value => setForm('email', value)}
                        />
                        <Gap height={24} />
                        <Input
                            label="Password"
                            value={form.password}
                            onChangeText={value => setForm('password', value)}
                            secureTextEntry
                        />
                        <Gap height={40} />
                        <Button
                            title="Continue"
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
})