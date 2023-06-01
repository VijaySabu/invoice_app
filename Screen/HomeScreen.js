import { StyleSheet, Text, View , Image ,TouchableOpacity } from 'react-native'
import React from 'react'

export default function HomeScreen({ navigation }) {
  return (
    <View style = {styles.container}>
    <Image 
    style = {{
        width : 100,
        height : 110,
    }}
    source={require('../assets/logo.png')}/>
     <TouchableOpacity style = {styles.button}
      onPress={() => navigation.navigate('CreateBill')}
     >
         <Text>Create Bill</Text>
     </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button :{
        height : 30 ,
        width : 100,
        backgroundColor : "lightblue",
        allignItems : "center",
        justifyContent : "center",
        elevation : 10 
    }
  });




