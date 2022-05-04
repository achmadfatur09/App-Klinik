import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { ILLogo } from '../../assets';
import { Button, Gap, Input, Link, Loading } from '../../components';
import { colors, fonts, showError, showSuccess, storeData, useForm } from '../../utils';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { getDatabase, ref, get } from '@firebase/database';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';

export default function Login({ navigation }) {
    const [form, setForm] = useForm({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    // const stateGlobal = useSelector(state => state);
    // const dispatch = useDispatch

    const login = () => {
        setLoading(true);
        // dispatch({ type: 'SET_LOADING', value: true });
        const auth = getAuth();
        signInWithEmailAndPassword(auth, form.email, form.password)
            .then(res => {
                const db = getDatabase();
                get(ref(db, 'users/' + auth.currentUser.uid)).then((snapshot) => {
                    storeData('user', snapshot.val())
                    navigation.replace('MainApp');
                })
                setLoading(false);
                // dispatch({ type: 'SET_LOADING', value: false });
            })
            .catch(err => {
                setLoading(false);
                // dispatch({ type: 'SET_LOADING', value: false });
                showError(err.message);
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
});