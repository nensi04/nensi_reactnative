import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface SkeletonLoaderProps {
  isDarkMode?: boolean;
  itemCount?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ isDarkMode = false, itemCount = 5 }) => {
  const [uniqueId] = React.useState(() => Math.random().toString(36).substr(2, 9));
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const renderSkeletonItem = (index: number) => (
    <View key={`skeleton-${uniqueId}-${index}`} style={[styles.card, isDarkMode && styles.cardDark]}>
      <Animated.View
        style={[
          styles.postNumberSkeleton,
          { 
            backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
            opacity 
          }
        ]}
      />
      
      <Animated.View
        style={[
          styles.titleSkeleton,
          { 
            backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
            opacity 
          }
        ]}
      />
      
      <Animated.View
        style={[
          styles.bodySkeleton,
          { 
            backgroundColor: isDarkMode ? '#4B5563' : '#F3F4F6',
            opacity 
          }
        ]}
      />
      <Animated.View
        style={[
          styles.bodySkeletonShort,
          { 
            backgroundColor: isDarkMode ? '#4B5563' : '#F3F4F6',
            opacity 
          }
        ]}
      />
    </View>
  );

  return (
    <View>
      {[...Array(itemCount)].map((_, index) => renderSkeletonItem(index))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardDark: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
  },
  postNumberSkeleton: {
    width: 60,
    height: 12,
    borderRadius: 4,
    marginBottom: 8,
  },
  titleSkeleton: {
    width: '90%',
    height: 16,
    borderRadius: 4,
    marginBottom: 8,
  },
  bodySkeleton: {
    width: '100%',
    height: 14,
    borderRadius: 4,
    marginBottom: 4,
  },
  bodySkeletonShort: {
    width: '75%',
    height: 14,
    borderRadius: 4,
  },
});

export default SkeletonLoader;
