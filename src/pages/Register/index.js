import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Gap, Header, Input, Loading } from '../../components';
import { colors, showError, storeData, useForm } from '../../utils';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { getDatabase, ref, set, get } from '@firebase/database';

export default function Register({ navigation }) {
    useEffect(() => {
        const db = getDatabase();
        get(ref(db, 'users/')).then(res => {
          // console.log('data: ',res);
        let data = []
        if (res.val()) {
            res.forEach(v => {
                data.push(v.val().noRekamMedis);
            })
            const d = data.sort().map(v => parseInt(v.replace("RM", '')))
            setForm('noRekamMedis', "RM"+Math.max(...d))
        }
        }).catch(err => {
            showError(err.message);
        })
    }, [])

    const [form, setForm] = useForm({
        fullName: '',
        profession: '',
        alamat: '',
        noHp: '',
        email: '',
        password: '',
        // noRekamMedis: (Math.random() * 2).toString(36).substring(2)
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
                showError('The email address already in use and password less than 6 characters');
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
                            label="Alamat"
                            value={form.alamat}
                            onChangeText={value => setForm('alamat', value)}
                        />
                        <Gap height={24} />
                        <Input
                            label="No HP"
                            value={form.noHp}
                            onChangeText={value => setForm('noHp', value)}
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
                        <Gap height={50} />
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