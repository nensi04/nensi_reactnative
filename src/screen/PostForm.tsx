import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { addPost, updatePost } from '../store/PostSlice';
import * as Yup from 'yup';
import { Formik } from 'formik';

type PostFormParams = {
  mode: 'add' | 'edit';
  post?: { id: string; title: string; body: string };
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters'),
  body: Yup.string()
    .required('Body is required')
    .min(10, 'Body must be at least 10 characters')
    .max(500, 'Body must be at most 500 characters'),
});
const PostForm = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

 const { mode, post } = (route.params as PostFormParams) || {};
  const [title, setTitle] = useState(post?.title || '');
  const [body, setBody] = useState(post?.body || '');

  const savePost = async () => {
   if (mode === 'add') {
  const newPost = { id: uuid.v4().toString(), title, body };
  dispatch(addPost(newPost));
  const storedPosts = await AsyncStorage.getItem('posts');
  const updated = storedPosts ? [...JSON.parse(storedPosts), newPost] : [newPost];
  await AsyncStorage.setItem('posts', JSON.stringify(updated));
} else {
  if (!post) {
    Alert.alert('Error', 'Post not found for editing');
    return;
  }
  const updatedPost = { id: post.id, title, body };
  dispatch(updatePost(updatedPost));
  const storedPosts: any = await AsyncStorage.getItem('posts');
  const updated = JSON.parse(storedPosts).map((p: any) =>
    p.id === updatedPost.id ? updatedPost : p
  );
  await AsyncStorage.setItem('posts', JSON.stringify(updated));
}

    navigation.goBack();
  };

  return (
      <Formik
      initialValues={{
        title: post?.title || '',
        body: post?.body || '',
      }}
      validationSchema={validationSchema}
      onSubmit={savePost}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
       {touched.title && errors.title && <Text style={styles.error}>{errors.title}</Text>}
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Body"
        value={body}
        multiline
        onChangeText={setBody}
      />
      {touched.body && errors.body && <Text style={styles.error}>{errors.body}</Text>}
      <TouchableOpacity style={styles.saveButton} onPress={savePost}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
    )}
    </Formik>
    //  <Formik
    //   initialValues={{
    //     title: post?.title || '',
    //     body: post?.body || '',
    //   }}
    //   validationSchema={validationSchema}
    //   onSubmit={savePost}
    // >
    //   {({ handleChange, handleSubmit, values, errors, touched }) => (
    //     <View style={styles.container}>
    //       <Text>Title</Text>
    //       <TextInput
    //         style={styles.input}
    //         value={values.title}
    //         onChangeText={handleChange('title')}
    //       />
    //       {touched.title && errors.title && <Text style={styles.error}>{errors.title}</Text>}

    //       <Text>Body</Text>
    //       <TextInput
    //         style={[styles.input, { height: 100 }]}
    //         multiline
    //         value={values.body}
    //         onChangeText={handleChange('body')}
    //       />
    //       {touched.body && errors.body && <Text style={styles.error}>{errors.body}</Text>}

    //       <Button title="Save Post" onPress={() => handleSubmit()} />
    //     </View>
    //   )}
    // </Formik>
  );
};

export default PostForm;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontWeight: 'bold' },
  error: { color: 'red', fontSize: 12, marginBottom: 8 },
});
