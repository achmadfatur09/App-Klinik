import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Header, List } from '../../components';
import { DummyDoctor1 } from '../../assets';
import { colors } from '../../utils';

export default function ChooseDoctor({ navigation }) {
    return (
        <View style={styles.page}>
            <Header
                type="dark"
                title="Pilih Dokter Anak"
                onPress={() => navigation.goBack()}
            />
            <List
                type="next"
                profile={DummyDoctor1}
                name="Nurin Naila"
                desc="Wanita"
                onPress={() => navigation.navigate('Chatting')}
            />
            <List
                type="next"
                profile={DummyDoctor1}
                name="Nurin Naila"
                desc="Wanita"
            />
            <List
                type="next"
                profile={DummyDoctor1}
                name="Nurin Naila"
                desc="Wanita"
            />
            <List
                type="next"
                profile={DummyDoctor1}
                name="Nurin Naila"
                desc="Wanita"
            />
            <List
                type="next"
                profile={DummyDoctor1}
                name="Nurin Naila"
                desc="Wanita"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1,
    },
})