
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  useColorScheme,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Header from '../component/Header';
import SkeletonLoader from '../component/SkeletonLoader';

const { width } = Dimensions.get('window');

const TaskScreen1 = () => {
  const systemScheme = useColorScheme(); 
  const [overrideMode, setOverrideMode] = useState<null | boolean>(null); 
  const isDarkMode = overrideMode !== null ? overrideMode : systemScheme === 'dark';
  
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const limit = 10;

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const toggleTheme = () => {
  setOverrideMode(prev => !prev);
};

  const fetchPosts = async (isRefresh = false) => {
    if (page === 1 && !isRefresh) {
      setLoading(true);
    } else if (page > 1) {
      setLoadingMore(true);
    }

    try {
      // Use pagination parameters: _page and _limit for JSONPlaceholder API
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
      );

      const newData = res.data;

      if (newData.length > 0) {
        if (page === 1) {
          setData(newData); // Reset data for first page
        } else {
          setData(prev => [...prev, ...newData]); // Append data for subsequent pages
        }
        
        // Check if we have more data (JSONPlaceholder has 100 posts total)
        if (newData.length < limit) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log('Error fetching posts:', error);
    }

    setLoading(false);
    setLoadingMore(false);
    if (isRefresh) {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    setData([]);
    fetchPosts(true);
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={[styles.card, isDarkMode && styles.cardDark]}>
      <Text style={[styles.postNumber, isDarkMode && styles.postNumberDark]}>
        Post #{item.id}
      </Text>
      <Text style={[styles.title, isDarkMode && styles.titleDark]}>
        {item.title}
      </Text>
      <Text style={[styles.body, isDarkMode && styles.bodyDark]}>
        {item.body}
      </Text>
    </View>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    
    // Show skeleton items when loading more posts
    return (
      <SkeletonLoader isDarkMode={isDarkMode} itemCount={3} />
    );
  };


  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#121212' : '#fff' }
      ]}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header title="Task Screen 1" isDarkMode={isDarkMode}   onToggleTheme={toggleTheme} />

      {/* List */}
      {loading ? (
        <SkeletonLoader isDarkMode={isDarkMode} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          onEndReached={() => {
            if (hasMore && !loadingMore) {
              setPage(prev => prev + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardDark: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
  },
  postNumber: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 8,
  },
  postNumberDark: {
    color: '#9CA3AF',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF', // Nice blue color for titles
    marginBottom: 8,
    lineHeight: 22,
  },
  titleDark: {
    color: '#60A5FA', // Light blue for dark mode
  },
  body: {
    fontSize: 14,
    color: '#059669', // Subtle green for body text
    lineHeight: 20,
  },
  bodyDark: {
    color: '#34D399', // Light green for dark mode
  },
});

export default TaskScreen1;
