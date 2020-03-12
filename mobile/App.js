import React from 'react';
import {YellowBox} from 'react-native';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';

import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return (
    <Routes/>
  );
}

