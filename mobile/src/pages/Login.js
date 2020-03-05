import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';

import logo from '../assets/logo.png';
import api from '../services/api';

export default function Login({ navigation }) {

    const [user, setUser] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Main', { _id });
            }
        });
    }, []);

    async function handleLogin() {
        const response = await api.post('devs', { username: user });

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);

        navigation.navigate('Main', { user: _id });
    }

    return (
        <View style={styles.container}>
            <Image source={logo} />
            <TextInput style={styles.input}
                placeholder="Enter your gitub user"
                value={user}
                onChangeText={setUser}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}><Text style={styles.buttonText}>Enter</Text></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40
    },
    input: {
        height: 45,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginTop: 20
    },
    button: {
        height: 45,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    buttonText: {
        color: 'white'
    }
});
