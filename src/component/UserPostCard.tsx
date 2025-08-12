import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

interface Post {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

interface UserPostCardProps {
  item: Post;
  isDarkMode: boolean;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
}

const UserPostCard: React.FC<UserPostCardProps> = ({
  item,
  isDarkMode,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Unknown date';
    }
  };

  return (
    <View style={[styles.postCard, isDarkMode && styles.postCardDark]}>
      <View style={styles.postContent}>
        <View style={styles.postHeader}>
          <Text style={[styles.postTitle, isDarkMode && styles.postTitleDark]} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={[styles.postDate, isDarkMode && styles.postDateDark]}>
            {formatDate(item.createdAt || item.updatedAt)}
          </Text>
        </View>
        <Text style={[styles.postBody, isDarkMode && styles.postBodyDark]} numberOfLines={3}>
          {item.body}
        </Text>
        <View style={styles.postActions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => onEdit(item)}
            activeOpacity={0.8}
          >
            <Text style={styles.editButtonText}> Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => onDelete(item)}
            activeOpacity={0.8}
          >
            <Text style={styles.deleteButtonText}> Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  postCardDark: {
    backgroundColor: '#1F2937',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
  },
  postContent: {
    padding: 20,
  },
  postHeader: {
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    lineHeight: 28,
    marginBottom: 4,
  },
  postTitleDark: {
    color: '#F9FAFB',
  },
  postDate: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  postDateDark: {
    color: '#9CA3AF',
  },
  postBody: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 20,
  },
  postBodyDark: {
    color: '#D1D5DB',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#10B981',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default UserPostCard;
