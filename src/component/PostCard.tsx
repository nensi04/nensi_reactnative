import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

interface PostCardProps {
  item: {
    id: number;
    title: string;
    body: string;
  };
  index: number;
  isDarkMode: boolean;
  onPress?: (item: any) => void;
}

const PostCard: React.FC<PostCardProps> = ({ item, index, isDarkMode, onPress }) => {
  const cardColors = [
    { primary: '#3B82F6', secondary: '#EBF4FF', accent: '#1E40AF' },
    { primary: '#10B981', secondary: '#ECFDF5', accent: '#047857' },
    { primary: '#F59E0B', secondary: '#FFFBEB', accent: '#D97706' },
    { primary: '#EF4444', secondary: '#FEF2F2', accent: '#DC2626' },
    { primary: '#8B5CF6', secondary: '#F5F3FF', accent: '#7C3AED' },
    { primary: '#EC4899', secondary: '#FDF2F8', accent: '#DB2777' },
  ];
  
  const colorScheme = cardColors[index % cardColors.length];
  
  return (
    <TouchableOpacity 
      style={[styles.card, isDarkMode && styles.cardDark]} 
      activeOpacity={0.95}
      onPress={() => onPress?.(item)}
    >
      {/* Card Header with Post Number */}
      <View style={[styles.cardHeader, { backgroundColor: isDarkMode ? colorScheme.accent : colorScheme.secondary }]}>
        <View style={[styles.postBadge, { backgroundColor: colorScheme.primary }]}>
          <Text style={styles.postBadgeText}>#{item.id}</Text>
        </View>
        <View style={styles.postMetaInfo}>
          <Text style={[styles.postLabel, isDarkMode && styles.postLabelDark]}>Blog Post</Text>
          <Text style={[styles.postDate, isDarkMode && styles.postDateDark]}>Just now</Text>
        </View>
      </View>
      
      {/* Card Content */}
      <View style={styles.cardContent}>
        <Text style={[styles.title, isDarkMode && styles.titleDark]} numberOfLines={2}>
          {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
        </Text>
        <Text style={[styles.body, isDarkMode && styles.bodyDark]} numberOfLines={3}>
          {item.body.charAt(0).toUpperCase() + item.body.slice(1)}
        </Text>
      </View>
      
      {/* Decorative Elements */}
      <View style={[styles.cardDecoration, { backgroundColor: colorScheme.primary }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  cardDark: {
    backgroundColor: '#1E293B',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  postBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  postBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  postMetaInfo: {
    flex: 1,
  },
  postLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  postLabelDark: {
    color: '#D1D5DB',
  },
  postDate: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  postDateDark: {
    color: '#9CA3AF',
  },
  cardContent: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
    lineHeight: 26,
  },
  titleDark: {
    color: '#F9FAFB',
  },
  body: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
  },
  bodyDark: {
    color: '#D1D5DB',
  },
  cardDecoration: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
  },
});

export default PostCard;
