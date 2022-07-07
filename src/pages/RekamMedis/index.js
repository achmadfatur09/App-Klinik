import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Gap, Header, Input, Loading } from '../../components';
import { colors, showError, storeData, useForm } from '../../utils';
import { getDatabase, ref, push,get } from '@firebase/database';
import { Picker } from '@react-native-picker/picker';

export default function RekamMedis({ navigation, route }) {
    const {nama} = route.params;
    const [selectedValue, setSelectedValue] = useState();
    const [pasienAll, setPasienAll] = useState([]);
    const [pasien, setPasien] = useState({
        noRekamMedis:'',
        fullName:'',
        alamat:'',
        noHp:''
    });
    
    const [form, setForm] = useForm({
        date: new Date().toLocaleString(),
        dokter:nama,
    });

    

    useEffect(() => {
        get(ref(getDatabase(), 'users/')).then(res => {
            let data = []
            if (res.val()) {
                res.forEach(v => {
                    data.push(v);
                })
                setPasienAll(data);
            }
        })
    }, []);

    const [loading, setLoading] = useState(false);

    const onContinue = () => {

        setLoading(true);
        const db = getDatabase();
        const data = {...form, ...pasien};

        if(push(ref(db, 'rekammedis/'), data)){
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
                        <Picker
                            selectedValue={selectedValue}
                            style={{height:50}}
                            onValueChange={(itemSelected) => {
                                if(itemSelected != null){
                                    setSelectedValue(itemSelected);
                                    setPasien({
                                        noRekamMedis:itemSelected.val().noRekamMedis,
                                        fullName:itemSelected.val().fullName,
                                        alamat:itemSelected.val().alamat,
                                        noHp:itemSelected.val().noHp
                                    })
                                }
                                console.log("form : ",form);
                            }}
                        >
                            <Picker.Item label="Pilih Pasien" value={null}/>
                            {
                                pasienAll.map(i => {
                                    return <Picker.Item label={i.val().fullName} value={i} />
                                })
                            }
                        </Picker>

                        <Input
                            label="No Rekam Medis"
                            value={pasien.noRekamMedis}
                            onChangeText={value => setPasien(...pasien,{ noRekamMedis:value})} disable
                        />
                        <Gap height={24} />
                        <Input
                            label="Full Name"
                            value={pasien.fullName}
                            onChangeText={value => setPasien(...pasien, {fullName:value})} disable
                        />
                        <Gap height={24} />
                        <Input
                            label="Waktu"
                            value={form.date}
                            onChangeText={value => setForm('date', value)} disable
                        />
                        <Gap height={24} />
                        <Input
                            label="Alamat"
                            value={pasien.alamat}
                            onChangeText={value => setPasien(...pasien, {alamat:value})} disable
                        />
                        <Gap height={24} />
                        <Input
                            label="No Hp"
                            value={pasien.noHp}
                            onChangeText={value => setPasien(...pasien,{noHp:value})} disable
                        />
                        <Input
                            label="Dokter"
                            value={form.dokter}
                            onChangeText={value => setForm('dokter', value)} disable
                        />
                        <Gap height={24} />
                        <Input
                            label="Diagnosis"
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