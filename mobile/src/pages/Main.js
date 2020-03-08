import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage, Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import api from '../services/api';

export default function Main({ navigation }) {
    const id = navigation.getParam('user');

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', { headers: { user: id } });
            setUsers(response.data);
        }

        loadUsers();
    }, [id]);

    async function handleLike() {
        const [user, ...rest] = users;
        await api.post(`/devs/${user._id}/likes`, null, { headers: { user: id } });
        setUsers(rest);
    }

    async function handleDislike() {
        const [user, ...rest] = users;
        await api.post(`/devs/${user._id}/dislikes`, null, { headers: { user: id } });
        setUsers(rest);
    }

    async function handleLogout() {
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }

    //Animation

    const translateX = new Animated.Value(0);

    let offsetX = 0;

    const animatedEvent = Animated.event([
        {
            nativeEvent: {
                translationX: translateX
            }
        }
    ]);

    function onHandlerStateChanged(event) {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            const { translationX } = event.nativeEvent;
            offsetX = translationX;
            if (offsetX > 170) {
                handleLike();
            } else if (offsetX < -170) {
                handleDislike();
            } else {
                Animated.timing(translateX, { toValue: 0, duration: 100 }).start();
            }

        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLogout} ><Image style={styles.logo} source={logo} /></TouchableOpacity>
            <PanGestureHandler
                onGestureEvent={animatedEvent}
                onHandlerStateChange={onHandlerStateChanged}
            >
                <View style={styles.cardsContainer}>
                    {users.length === 0 ?
                        <Text style={styles.empty}>Empty :(</Text>
                        : (
                            users.map((user, index) => (
                                <Animated.View key={user._id} style={[styles.card, { zIndex: users.length - index }, index === 0 && { transform: [{ translateX },{ rotate: translateX.interpolate({inputRange:[-170,170],outputRange:[-0.1,0.1],extrapolate: 'clamp'}) }] }]}>
                                    <Image style={styles.avatar} source={{ uri: user.avatar }} />
                                    <View style={styles.footer}>
                                        <Text style={styles.name}>{user.name}</Text>
                                        <Text style={styles.bio}>{user.bio}</Text>
                                    </View>
                                </Animated.View>
                            ))

                        )}
                </View>
            </PanGestureHandler>
            <View style={styles.buttonsContainer}>
                {users.length > 0 && (
                    <>
                        <TouchableOpacity style={styles.button} onPress={handleDislike}>
                            <Image source={dislike} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleLike}>
                            <Image source={like} />
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    avatar: {
        flex: 1
    },
    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 40
    },
    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 400
    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    button: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: '#FFF',
        elevation: 2,
        marginHorizontal: 15
    },
    footer: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5
    },
    logo: {
        marginBottom: 20
    }
});
