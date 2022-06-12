import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { List } from '../../components';
import { colors, fonts } from '../../utils';
import { DummyDoctor4, DummyDoctor5, DummyDoctor6 } from '../../assets';
import { getAuth} from '@firebase/auth';
import { getDatabase, ref, onValue } from '@firebase/database';

export default function Messages({ navigation }) {
  const [chatlist, setChatlist] = useState([]);
  const [docters, setDocters] = useState([]);
  
  const db = getDatabase();
  useEffect(()=>{
    const reference = ref(db, 'chatlist/' + getAuth().currentUser.uid );
    onValue(reference,(snapshot)=> {
      // console.log('--------------------')
      //   console.log(snapshot)
      setChatlist(snapshot);
    })
  },[])

  useEffect(()=>{
    let data = []
    onValue(ref(db, 'docter/'),(snapshot) => {
      
      snapshot.forEach((snp) => {
        chatlist.forEach((i)=> {
          if(i.val().id == snp.key){
            data.push(snp)
          }
        })
      })
      setDocters(data);
    })
  },[chatlist])
  // console.log(chatlist)

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {
          docters.map((docter) => {
            return (
              <List
                key={docter.key}
                profile={DummyDoctor4}  
                name={docter.val().nama}
                desc={docter.val().pekerjaan}
                onPress={() => navigation.navigate('Chatting', {id:docter.key})}
              />
            );
          })
        }
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  },
});