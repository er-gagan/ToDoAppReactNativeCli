import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, DevSettings } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import firestore from '@react-native-firebase/firestore';

const AccountScreen = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)

    let LOGOUT = async () => {
        try {
            let loggedIn = {}
            loggedIn.loggedInSync = false
            await AsyncStorage.setItem('loggedIn', JSON.stringify(loggedIn))
            DevSettings.reload();
        } catch (e) {
            console.log("error", e)
        }
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0.8, height: "30%", justifyContent: "space-evenly", alignItems: "center" }}>
                <Button icon="logout" mode="contained" onPress={() => LOGOUT()}>
                    Logout
                </Button>
            </View>
            <View style={{ flex: 0.2 }}>
                <Text style={{ fontSize: 17, textAlign: "center", color: "#979595" }}>Copyright{'\u00A9'}2021</Text>
                <Text style={{ fontSize: 15, textAlign: "center", color: "#5e5a5a" }}>Gagan Aggarwal (Software Engineer)</Text>
                <Text style={{ fontSize: 15, textAlign: "center", color: "#5e5a5a" }}>Email: gaggarwal124@gmail.com</Text>
            </View>
        </View>
    )
}

export default AccountScreen
