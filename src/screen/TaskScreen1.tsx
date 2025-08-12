
import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
} from 'react-native';
import Header from '../component/Header';
import SkeletonLoader from '../component/SkeletonLoader';
import PostCard from '../component/PostCard';
import { useTheme } from '../hooks/useTheme';
import { usePaginatedData } from '../hooks/usePaginatedData';

const TaskScreen1 = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const {
    data,
    loading,
    loadingMore,
    hasMore,
    refreshing,
    loadMore,
    refresh,
  } = usePaginatedData({ 
    url: 'https://jsonplaceholder.typicode.com/posts',
    limit: 10 
  });

  const handlePostPress = (post: any) => {
    console.log('Post pressed:', post.id);
    // You can add navigation or modal logic here
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <PostCard
      item={item}
      index={index}
      isDarkMode={isDarkMode}
      onPress={handlePostPress}
    />
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
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={refresh}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: '#F8F9FA',
  },
});

export default TaskScreen1;
