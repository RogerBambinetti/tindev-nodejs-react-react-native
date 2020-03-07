import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import logo from '../assets/logo.png';
import api from '../services/api';

export default function Login({ navigation }) {

    const [user, setUser] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Main', { user });
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
            <LinearGradient colors={['#F25C5C', '#F24976']} style={styles.background} >
                <Image source={logo} tintColor='white'/>
                <TextInput style={styles.input}
                    placeholder="Enter your gitub user"
                    value={user}
                    onChangeText={setUser}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}><Text style={styles.buttonText}>Enter</Text></TouchableOpacity>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40
    },
    input: {
        height: 50,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1.5,
        borderColor: '#ddd',
        borderRadius: 25,
        marginTop: 20,
        paddingHorizontal: 20
    },
    button: {
        height: 50,
        alignSelf: 'stretch',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderWidth: 1.5,
        borderColor: '#FFF',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold'
    }
});
