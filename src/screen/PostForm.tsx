import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { addPost, updatePost } from '../store/PostSlice';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Header from '../component/Header';
import { useTheme } from '../hooks/useTheme';

type PostFormParams = {
  mode: 'add' | 'edit';
  post?: { 
    id: string; 
    title: string; 
    body: string; 
    createdAt: string;
    updatedAt: string;
  };
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(15, 'Title must be at most 15 characters')
    .trim(),
  body: Yup.string()
    .max(500, 'Description must be at most 500 characters')
    .trim(),
});
const PostForm = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isDarkMode, toggleTheme } = useTheme();

  const { mode, post } = (route.params as PostFormParams) || {};
  const isEditMode = mode === 'edit';

  const handleSubmit = async (values: { title: string; body: string }) => {
    try {
      const currentTime = new Date().toISOString();
      
      if (mode === 'add') {
        const newPost = {
          id: uuid.v4().toString(),
          title: values.title.trim(),
          body: values.body.trim(),
          createdAt: currentTime,
          updatedAt: currentTime,
        };
        
        dispatch(addPost(newPost));
        const storedPosts = await AsyncStorage.getItem('posts');
        const updated = storedPosts ? [...JSON.parse(storedPosts), newPost] : [newPost];
        await AsyncStorage.setItem('posts', JSON.stringify(updated));
      } else {
        if (!post) {
          Alert.alert('Error', 'Post not found for editing');
          return;
        }
        
        const updatedPost = {
          ...post,
          title: values.title.trim(),
          body: values.body.trim(),
          updatedAt: currentTime,
        };
        
        dispatch(updatePost(updatedPost));
        const storedPosts = await AsyncStorage.getItem('posts');
        if (storedPosts) {
          const posts = JSON.parse(storedPosts);
          const updated = posts.map((p: any) =>
            p.id === updatedPost.id ? updatedPost : p
          );
          await AsyncStorage.setItem('posts', JSON.stringify(updated));
        }
      }
      
      navigation.goBack();
    } catch (error) {
      console.error('Error saving post:', error);
      Alert.alert('Error', 'Failed to save post. Please try again.');
    }
  };

  const renderInput = (
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void,
    error?: string,
    touched?: boolean,
    multiline = false,
    maxLength?: number
  ) => (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isDarkMode && styles.labelDark]}>
        {placeholder}
        {placeholder === 'Title' && <Text style={styles.required}> *</Text>}
      </Text>
      <TextInput
        style={[
          styles.input,
          isDarkMode && styles.inputDark,
          multiline && styles.textArea,
          error && touched && styles.inputError,
        ]}
        placeholder={`Enter ${placeholder.toLowerCase()}...`}
        placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        maxLength={maxLength}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
      {maxLength && (
        <Text style={[styles.charCount, isDarkMode && styles.charCountDark]}>
          {value.length}/{maxLength}
        </Text>
      )}
      {error && touched && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header 
        title={isEditMode ? 'Edit Post' : 'Create Post'} 
        isDarkMode={isDarkMode} 
        onToggleTheme={toggleTheme}
      />
      
      <Formik
        initialValues={{
          title: post?.title || '',
          body: post?.body || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleChange, handleSubmit, values, errors, touched, isValid, dirty }) => (
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.form}>
              {renderInput(
                'Title',
                values.title,
                handleChange('title'),
                errors.title,
                touched.title,
                false,
                15
              )}

              {renderInput(
                'Description',
                values.body,
                handleChange('body'),
                errors.body,
                touched.body,
                true,
                500
              )}

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.cancelButton, isDarkMode && styles.cancelButtonDark]}
                  onPress={() => navigation.goBack()}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.cancelButtonText, isDarkMode && styles.cancelButtonTextDark]}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.saveButton,
                    isDarkMode && styles.saveButtonDark,
                  ]}
                  onPress={() => handleSubmit()}
                  activeOpacity={0.8}
                >
                  <Text style={styles.saveButtonText}>
                    {isEditMode ? ' Update Post' : 'Create Post'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default PostForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  form: {
    padding: 20,
    paddingBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  labelDark: {
    color: '#F9FAFB',
  },
  required: {
    color: '#EF4444',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    minHeight: 48,
  },
  inputDark: {
    backgroundColor: '#374151',
    borderColor: '#4B5563',
    color: '#F9FAFB',
  },
  textArea: {
    minHeight: 120,
    maxHeight: 200,
    paddingTop: 12,
  },
  inputError: {
    borderColor: '#EF4444',
    borderWidth: 2,
  },
  charCount: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
    marginTop: 4,
  },
  charCountDark: {
    color: '#9CA3AF',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    marginTop: 4,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonDark: {
    backgroundColor: '#4B5563',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  cancelButtonTextDark: {
    color: '#D1D5DB',
  },
  saveButton: {
    flex: 2,
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonDark: {
    backgroundColor: '#60A5FA',
    shadowColor: '#60A5FA',
  },
  saveButtonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
