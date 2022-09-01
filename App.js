import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [count, setCount] = useState(0);


  useEffect(()=> {
    getData()
    .then(myData => setCount(JSON.parse(myData)))
    .catch(err => {
      console.log('useEffect data fetch failed ', err)
    })
  }, [])

  const storeData = async (num) => {
    try {
      await AsyncStorage.setItem(
        'key',
        JSON.stringify(num)
      );
      console.log(num)
    } catch (error) {
      console.log('Error saving data')
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('key')
      if(value !== null) {
        let savedNum =  JSON.parse(value)
        console.log('THIS IS MY VALUE', JSON.parse(value))
        // value previously stored
        return savedNum;
      }
    } catch(e) {
      console.log('error reading value', e)
    }
    console.log('GET Done.')
  }



  return (
    <View style={styles.container}>
      <Text>count: {count}</Text>
      <Text>
        <Button
          onPress={()=> {
            let num = count + 1;
            storeData(num);
            setCount(num);
          }}
          title="Press Me">Press me
        </Button>
      </Text>
      <StatusBar style="auto"
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// npm run ios --reset-cache