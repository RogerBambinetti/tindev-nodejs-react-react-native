import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity } from 'react-native';

import logo from '../assets/logo.png';

export default function Login() {
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image source={logo} />
            <TextInput style={styles.input} placeholder="Enter your gitub user" />
            <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Enter</Text></TouchableOpacity>
        </KeyboardAvoidingView>
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
    button:{
        height: 45,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    buttonText:{
        color: 'white'
    }
});
