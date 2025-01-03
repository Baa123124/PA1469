import React, { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Star } from "@/lib/icons/Star";
import { CalendarRange } from "lucide-react-native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface CommentSectionViewProps {
  comments: Review[]; // Data of the current selected cache
}

type Review = {
  id: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  createdAt: Date;
  photo: string;
  userName: string;
};

const CommentSectionView: React.FC<CommentSectionViewProps> = ({
  comments,
}) => {
  const [expandedCommentId, setExpandedCommentId] = useState<string | null>(
    null
  );

  const toggleExpand = (id: string) => {
    setExpandedCommentId((prevId) => (prevId === id ? null : id));
  };

  return (
    <View style={styles.container}>
      {comments.map((comment) => (
        <View key={comment.id} style={styles.commentCard}>
          <View style={styles.header}>
            {/* Avatar */}
            <Avatar style={styles.avatar} alt={`Avatar of ${comment.userName}`}>
              <AvatarImage source={{ uri: comment.photo }} />
            </Avatar>

            {/* User Info */}
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{comment.userName}</Text>
              {/* Meta Info (e.g., date) */}
              <View style={styles.metaInfo}>
                <CalendarRange width={14} height={14} color="#6B7280" />
                <Text style={styles.metaText}>
                  {comment.createdAt.toLocaleDateString()}
                </Text>
              </View>
            </View>

            {/* Rating */}
            <View style={styles.rating}>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Star
                  width={14}
                  height={14}
                  className={`${
                    index < (comment.rating || 0) ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill={index < (comment.rating || 0) ? "#FFD700" : "none"}
                />
              ))}
            </View>
          </View>

          {/* Comment Text Section */}
          <View style={styles.commentContentContainer}>
            <Text
              style={[
                styles.commentText,
                expandedCommentId === comment.id
                  ? styles.expanded
                  : styles.collapsed,
              ]}
              numberOfLines={
                expandedCommentId === comment.id ? undefined : 3
              }
            >
              {comment.comment}
            </Text>

            {/* Expand/Collapse Button */}
            {comment.comment.length > 100 && (
              <TouchableOpacity
                onPress={() => toggleExpand(comment.id)}
                style={styles.expandButton}
              >
                <Text style={styles.expandButtonText}>
                  {expandedCommentId === comment.id ? "Show Less" : "Read More"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

export default CommentSectionView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#F9FAFB",
  },
  commentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
    overflow: "hidden",
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
  metaInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: "#6B7280",
  },
  rating: {
    flexDirection: "row",
    gap: 2,
  },
  commentContentContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  commentText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  collapsed: {
    maxHeight: 60,
    overflow: "hidden",
  },
  expanded: {
    maxHeight: undefined,
  },
  expandButton: {
    marginTop: 4,
    alignSelf: "flex-start",
  },
  expandButtonText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "bold",
  },
});