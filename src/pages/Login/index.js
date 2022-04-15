import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { ILLogo } from '../../assets';
import { Button, Gap, Input, Link, Loading } from '../../components';
import { colors, fonts, storeData, useForm } from '../../utils';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { showMessage } from 'react-native-flash-message';

export default function Login({ navigation }) {
    const [form, setForm] = useForm({ email: '', password: '' });
    const [loading, setLoading] = useState

    const login = () => {
        console.log('form: ', form);
        setLoading(true);
        const auth = getAuth()
        signInWithEmailAndPassword(form.email, form.password)
            .then(res => {
                console.log('success: ', res);
                setLoading(false);
                auth.database()
                    .ref(`users/${res.user.uid}/`)
                    .once('value').then(resDB => {
                        console.log('data user: ', resDB.val());
                        if (resDB.val()) {
                            storeData('user', resDB.val());
                            navigation.replace('MainApp');
                        }
                    });
            })
            .catch(err => {
                console.log('err: ', err);
                setLoading(false);
                showMessage({
                    message: err.message,
                    type: 'default',
                    backgroundColor: colors.error,
                    color: colors.white,
                })
            });
    };
    return (
        <>
            <View style={styles.page}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Gap height={40} />
                    <ILLogo />
                    <Text style={styles.title}>Masuk Dan Mulai Konsultasi</Text>
                    <Input
                        label="Email Address"
                        value={form.email}
                        onChangeText={(value) => setForm('email', value)}
                    />
                    <Gap height={24} />
                    <Input
                        label="Password"
                        value={form.password}
                        onChangeText={(value) => setForm('password', value)}
                        secureTextEntry
                    />
                    <Gap height={10} />
                    <Link title="Forget My Password" size={12} />
                    <Gap height={40} />
                    <Button title="Sign In" onPress={login} />
                    <Gap height={30} />
                    <Link
                        title="Create My Account"
                        size={16}
                        align="center"
                        onPress={() => navigation.navigate('Register')}
                    />
                </ScrollView>
            </View>
            {loading && <Loading />}
        </>
    );
};

const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: colors.white,
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        marginTop: 40,
        marginBottom: 40,
        maxWidth: 153,
    },
})