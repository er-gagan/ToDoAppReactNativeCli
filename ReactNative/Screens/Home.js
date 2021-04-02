import React, { useState, useEffect } from 'react';
import { View, Modal, Text, FlatList, TouchableOpacity } from 'react-native';
import { Appbar, TextInput, Button, List, IconButton, Colors } from 'react-native-paper';
import axios from 'axios'
// import Icon from 'react-native-vector-icons/FontAwesome';

const Home = () => {
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [listData, setListData] = useState([])
    const [loading, setLoading] = useState(false)
    const [NotRun, setUseEffect] = useState()
    const home = () => console.log('home');

    let getPlan = () => {
        axios.get("http://192.168.43.207/list")
            .then((res) => {
                setListData(res.data)
            }).catch(error => alert(error));
    }

    let postPlan = () => {
        axios.post('http://192.168.43.207/list', {
            "title": title,
            'description': desc
        })
            .then(function (response) {
                status = Number(response.status)
                if (status === 200) {
                    getPlan()
                }
                else {
                    alert("Something went wrong! Please try again")
                }
            })
            .catch(error => {
                alert(error);
            });
    }
    let deletePlan = () => {
        axios.delete('http://192.168.43.207/list', {
            data: {
                "id": id,
                "title": title
            }
        })
            .then(function (response) {
                status = Number(response.status)
                if (status === 200) {
                    getPlan()
                    setShowModal(false)
                }
                else {
                    alert("Something went wrong! Please try again")
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    let putPlan = () => {
        axios.put('http://192.168.43.207/list', {
            "id": id,
            "title": title,
            "description": desc
        })
            .then(response => {
                status = Number(response.status)
                if (status === 200) {
                    getPlan()
                    setShowModal(false)
                }
                else {
                    alert("Something went wrong! Please try again")
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    useEffect(() => {
        getPlan()
    }, [NotRun])

    let ListItemUnique = (id, title, description, modalState) => {
        setId(id)
        setTitle(title)
        setDesc(description)
        setShowModal(modalState)
    }

    const renderItem = (item) => {
        return (
            <List.Item
                style={{ borderColor: "#20272F", borderWidth: 0.5, margin: 10 }}
                title={((String(item.title).length) > 20) ? String(item.title).slice(0, 20) + ".." : item.title}
                description={((String(item.description).length) > 25) ? String(item.description).slice(0, 25) + ".." : item.description}
                onPress={() => ListItemUnique(item.id, item.title, item.description, true)}
            />
        )
    }

    return (
        <View style={{ flex: 1 }}>

            <View style={{ flex: 0.4 }}>
                <Appbar.Header>
                    <Appbar.Action icon="book" onPress={home} />
                    <Appbar.Content titleStyle={{ alignSelf: 'center', marginLeft: -50 }} subtitleStyle={{ alignSelf: 'center', marginLeft: -50 }} title="To Do List" subtitle="Records" />

                </Appbar.Header>


                <TextInput
                    label='Write title!'
                    value={title}
                    onChangeText={title => setTitle(title)}
                />
                <TextInput
                    label='Write description!'
                    value={desc}
                    numberOfLines={3}
                    multiline={true}
                    onChangeText={desc => setDesc(desc)}
                />
                <Button style={{ marginTop: 10, marginHorizontal: "30%" }} contentStyle={{ height: 50 }} mode="contained" onPress={() => postPlan()}>
                    Submit
                </Button>
            </View>

            <View style={{ flex: 0.6 }}>
                <Modal visible={showModal} transparent={true}>
                    <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                        <View style={{ margin: 50, backgroundColor: "#ffffff", borderRadius: 8, padding: 25, flex: 1 }}>
                            <IconButton
                                style={{ marginLeft: "90%", marginTop: "-8%" }}
                                icon="close"
                                color={Colors.black}
                                size={40}
                                onPress={() => setShowModal(false)}
                            />

                            <TextInput
                                style={{ marginVertical: 20 }}
                                label='Title'
                                value={title}
                                onChangeText={title => setTitle(title)}
                            />

                            <TextInput
                                style={{ marginVertical: 20 }}
                                label='Description'
                                value={desc}
                                numberOfLines={3}
                                multiline={true}
                                onChangeText={desc => setDesc(desc)}
                            />

                            <Button style={{ marginTop: 10, marginHorizontal: "25%" }} contentStyle={{ height: 50 }} onPress={() => putPlan()}>
                                Edit Record
                            </Button>

                            <Button style={{ marginTop: 10, marginHorizontal: "20%" }} contentStyle={{ height: 50 }} onPress={() => deletePlan()}>
                                Delete Record
                            </Button>
                        </View>
                    </View>
                </Modal>

                <FlatList
                    data={listData.reverse()}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => renderItem(item)}
                    onRefresh={() => {
                        setLoading(true)
                        getPlan()
                        setLoading(false)
                    }}
                    refreshing={loading}
                />

            </View>
           
        </View>
    )
}
export default Home