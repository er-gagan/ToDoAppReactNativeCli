import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar, TextInput, Button, List } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/FontAwesome';

const Home = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    const home = () => console.log('home');

    let getText = () => {
        console.log(title, desc)
    }

    return (
        <View>

            <Appbar.Header>
                <Appbar.Action icon="book" onPress={home} />
                <Appbar.Content titleStyle={{ alignSelf: 'center', marginLeft: -50 }} subtitleStyle={{ alignSelf: 'center', marginLeft: -50 }} title="To Do List" subtitle="Records" />

            </Appbar.Header>
            <View>
                <TextInput
                    label='Write title!'
                    value={title}
                    onChangeText={text => setTitle(text)}
                />
                <TextInput
                    label='Write description!'
                    value={desc}
                    numberOfLines={3}
                    multiline={true}
                    onChangeText={text => setDesc(text)}
                />
                <Button style={{ marginTop: 10, marginHorizontal: "30%" }} contentStyle={{ height: 50 }} mode="contained" onPress={() => getText()}>
                    Submit
                </Button>
            </View>
            <View>

                <List.Item
                    style={{ borderColor: "#20272F", borderWidth: 0.5, margin: 10 }}
                    title="First Item"
                    description="Item description"
                    onPress={() => console.log("Press")}
                    right={props => <List.Icon {...props} icon="delete" />}
                />

            </View>
        </View>
    )
}

export default Home
