import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Alert, 
  StatusBar,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../store/Store';
import { deletePost, setPosts } from '../store/PostSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../component/Header';
import UserPostCard from '../component/UserPostCard';
import EmptyState from '../component/EmptyState';
import CreateButton from '../component/CreateButton';
import { useTheme } from '../hooks/useTheme';

type RootStackParamList = {
  TaskScreen2: undefined;
  PostForm: { mode: 'add' | 'edit'; post?: { id: string; title: string; body: string; createdAt: string; updatedAt: string } };
};

type TaskScreen2NavProp = NativeStackNavigationProp<RootStackParamList, 'TaskScreen2'>;

interface Post {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

const TaskScreen2 = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  
  const dispatch = useDispatch();
  const navigation = useNavigation<TaskScreen2NavProp>();
  const posts = useSelector((state: RootState) => state.posts.posts);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const storedPosts = await AsyncStorage.getItem('posts');
      if (storedPosts) {
        dispatch(setPosts(JSON.parse(storedPosts)));
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  const handleEditPost = (post: Post) => {
    navigation.navigate('PostForm', { mode: 'edit', post });
  };

  const handleDeletePost = (post: Post) => {
    Alert.alert(
      'Delete Post',
      `Are you sure you want to delete "${post.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => removePost(post.id) }
      ]
    );
  };

  const removePost = async (id: string) => {
    try {
      dispatch(deletePost(id));
      const updatedPosts = posts.filter(p => p.id !== id);
      await AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
    } catch (error) {
      console.error('Error deleting post:', error);
      Alert.alert('Error', 'Failed to delete post');
    }
  };

  const handleCreatePost = () => {
    navigation.navigate('PostForm', { mode: 'add' });
  };

  const renderEmptyState = () => (
    <EmptyState
      icon="📝"
      title="No Posts Yet"
      message="Create your first post to get started!"
      isDarkMode={isDarkMode}
    />
  );

  const renderPostItem = ({ item }: { item: Post }) => (
    <UserPostCard
      item={item}
      isDarkMode={isDarkMode}
      onEdit={handleEditPost}
      onDelete={handleDeletePost}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FA' }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header 
        title="My Posts" 
        isDarkMode={isDarkMode} 
        onToggleTheme={toggleTheme}
      />
      
      <View style={styles.content}>
        <CreateButton
          title="Create New Post"
          onPress={handleCreatePost}
          isDarkMode={isDarkMode}
        />

        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderPostItem}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={isDarkMode ? '#60A5FA' : '#3B82F6'}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={posts.length === 0 ? styles.emptyContainer : styles.listContainer}
        />
      </View>
    </View>
  );
};

export default TaskScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
});
