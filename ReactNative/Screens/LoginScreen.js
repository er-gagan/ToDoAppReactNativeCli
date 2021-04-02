import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, Alert, KeyboardAvoidingView, DevSettings } from 'react-native'
import { TextInput, Button, TouchableRipple } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import App from '../App'
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const postData = async () => {
        try {
            const infoValue = await AsyncStorage.getItem('allTextValue')
            let resObject = JSON.parse(infoValue);
            let emailSync = resObject.textval1
            let passwordSync = resObject.textval2
            if (emailSync == email & passwordSync == password) {
                try {
                    let loggedIn = {}
                    loggedIn.loggedInSync = true
                    // console.log("email password match")
                    await AsyncStorage.setItem('loggedIn', JSON.stringify(loggedIn))
                    
                    // NativeModules.Dev
                    // DevSettings.reload()
                } catch (e) {
                    console.log("error", e)
                }
            }
            else {
                console.log("Email and password not match")
            }
        } catch (e) {
            console.log("error", e)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: "center", flex: 0.3 }}>
                <Image
                    style={{ width: 200, height: 200 }}
                    source={require('../Static/login.png')}
                />
                <Text style={{ fontSize: 30 }}>Please Login!</Text>
            </View>
            <View style={{ paddingHorizontal: 40, justifyContent: "space-evenly", flex: 0.7 }}>
                <TextInput
                    label="Email"
                    value={email}
                    mode="outlined"
                    onChangeText={text => setEmail(text)}
                />

                <TextInput
                    style={{ marginTop: -50 }}
                    label="Password"
                    value={password}
                    mode="outlined"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />

                <Button icon="login" mode="contained" style={{ marginTop: -50 }} onPress={() => postData()}>
                    Login
                </Button>
                <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                    <Text style={{ textAlign: "center" }}>Don't have an account?</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen