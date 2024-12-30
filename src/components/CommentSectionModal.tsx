import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Button,
    Animated,
    Pressable,
    StyleSheet
  } from 'react-native';


interface CommentSectionModalProps {
    comments: Comment[]; // Data of the current selected cache
}

interface Comment {
    creatorID: string;
    name: string;
    description: string;
    date: Date;
    raiting: number;
  }


const CommentSectionModal: React.FC<CommentSectionModalProps> = ({
    comments,
}) => { 
    return (
        <View

        >

        </View>)

}