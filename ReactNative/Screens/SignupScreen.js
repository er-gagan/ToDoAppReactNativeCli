import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // let postData = () => {
    //     console.log(email, password)
    // }
    const postData = async () => {
        let storedObject = {};
        storedObject.textval1 = email;
        storedObject.textval2 = password;
        try {
          await AsyncStorage.setItem('allTextValue', JSON.stringify(storedObject))
          alert("Successfully Signed Up!") 
          navigation.goBack() 
        } catch (e) {
          console.log("error",e)
        }
      }


    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: "center", flex: 0.3 }}>
                <Image
                    style={{ width: 200, height: 200 }}
                    source={require('../Static/login.png')}
                />
                <Text style={{ fontSize: 30 }}>Please Signup!</Text>
            </View>
            <View style={{ flex: 0.7, paddingHorizontal: 40, justifyContent: "space-evenly" }}>
                <TextInput
                    label="Email"
                    value={email}
                    mode="outlined"
                    onChangeText={email => setEmail(email)}
                />

                <TextInput
                    style={{ marginTop: -50 }}
                    label="Password"
                    value={password}
                    mode="outlined"
                    secureTextEntry={true}
                    onChangeText={password => setPassword(password)}
                />

                <Button icon="book" mode="contained" style={{ marginTop: -50 }} onPress={() => postData()}>
                    Signup
                </Button>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ textAlign: "center" }}>Login?</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignupScreen