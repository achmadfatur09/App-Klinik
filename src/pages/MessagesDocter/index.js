import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { List } from '../../components';
import { colors, fonts, getData } from '../../utils';
import { DummyDoctor4, DummyDoctor5, DummyDoctor6 } from '../../assets';
import { getAuth} from '@firebase/auth';
import { getDatabase, ref, onValue } from '@firebase/database';

export default function Messages({ navigation }) {
  const [chatlist, setChatlist] = useState([]);
  const [docters, setDocters] = useState([]);
  
  const db = getDatabase();
  
    // chatlist docter to user
    useEffect(()=>{

      const reference = ref(db, 'chatlist/' );
      let data = [];
      onValue(reference,(snapshot)=> {
        snapshot.forEach(i => {
          i.forEach(v => {
            if(v.key == getAuth().currentUser.uid){
              data.push(i)
            }
          })
        })
        setChatlist(data);
      })
    },[])
    // console.log(chatlist)

    // list user to docter
    useEffect(()=>{
      let data = []
      onValue(ref(db, 'users/'),(snapshot) => {
        
        snapshot.forEach((snp) => {
          chatlist.forEach((i)=> {
            if(i.key == snp.key){
              data.push(snp)
            }
          })
        })
        setDocters(data);
      })
    },[chatlist])
  
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {
          
          docters.map((docter) => {
            return (
              <List
                key={docter.key}
                profile={docter.val().photo}  
                name={docter.val().fullName}
                desc={docter.val().profession}
                onPress={() => navigation.navigate('ChattingDocter', {id:docter.key})}
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