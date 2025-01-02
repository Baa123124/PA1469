import React, { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "@/lib/icons/RaitingIcon";
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
    userName: string;
    titel: string;
    description: string;
    date: Date;
    raiting: number;
    avatarURL: string;
  }


const CommentSectionModal: React.FC<CommentSectionModalProps> = ({
    comments,
}) => { 
    return (
      comments.map((comment) => {
        return(
        <View
          
        >
          <View style={styles.userContainer}>

            <Avatar style={styles.avatar} alt={`Avatar of ${comment.userName}`}>
              <AvatarImage source={{uri: comment.avatarURL}}/>
            </Avatar>
          </View>
        </View>)
      })
    )

}

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
    overflow: "hidden",
  },
  fallbackText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  userInfo: {
    flex: 1,
    justifyContent: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: "#6B7280",
  },
  rating: {
    flexDirection: "row",
    gap: 2,
  },
});