import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Other from './Other';
import IsMe from './IsMe';

export default function ChatItem({ isMe }) {
    if (isMe) {
        return <IsMe />
    }
    return <Other />
};
