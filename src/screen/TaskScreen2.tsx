import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../store/Store';
import { deletePost, setPosts } from '../store/PostSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  TaskScreen2: undefined;
  PostForm: { mode: 'add' | 'edit'; post?: { id: string; title: string; body: string } };
};


type TaskScreen2NavProp = NativeStackNavigationProp<RootStackParamList, 'TaskScreen2'>;
const TaskScreen2 = () => {
  const dispatch = useDispatch();
const navigation = useNavigation<TaskScreen2NavProp>();
  const posts = useSelector((state: RootState) => state.posts.posts);

  useEffect(() => {
    const loadPosts = async () => {
      const storedPosts = await AsyncStorage.getItem('posts');
      if (storedPosts) {
        dispatch(setPosts(JSON.parse(storedPosts)));
      }
    };
    loadPosts();
  }, []);

  const removePost = async (id: string) => {
    dispatch(deletePost(id));
    const updatedPosts = posts.filter(p => p.id !== id);
    await AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('PostForm', { mode: 'add' })}
      >
        <Text style={styles.addText}>+ Add Post</Text>
      </TouchableOpacity>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text>{item.body}</Text>
            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() => navigation.navigate('PostForm', { mode: 'edit', post: item })}
              >
                <Text style={styles.edit}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removePost(item.id)}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TaskScreen2;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  addText: { color: '#fff', fontWeight: 'bold' },
  postCard: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  postTitle: { fontSize: 16, fontWeight: 'bold' },
  actions: { flexDirection: 'row', marginTop: 5, gap: 10 },
  edit: { color: 'green' },
  delete: { color: 'red' },
});
