import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Other from './Other';
import IsMe from './IsMe';

export default function ChatItem({ isMe, message, time}) {
    if (isMe) {
        return <IsMe message={message} time={time}/>
    }
    return <Other message={message} time={time}/>
};