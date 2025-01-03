import React, { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "@/lib/icons/Star"
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
    comments: Review[]; // Data of the current selected cache
}


type Review = {
  id: string
  rating: 1 | 2 | 3 | 4 | 5
  comment: string
  createdAt: Date
  photo: string
  userName: string
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
              <AvatarImage source={{uri: comment.photo}}/>
            </Avatar>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{comment.userName}</Text>
              {/* Here could caches explored portion be added*/}
            </View>

            {/* Rating */}
            <View style={styles.rating}>
              {[1,2,3,4,5].map((_, index) => (
                <Star key={index} width={14} height={14} color={index < (comment.rating || 0) ? "#FFD700" : "#D1D5DB"}/>
              ))}

            </View>


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