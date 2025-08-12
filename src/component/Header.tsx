import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface HeaderProps {
    title: string;
    isDarkMode: boolean;
    onToggleTheme: () => void;
    showBackButton?: boolean;
    onBackPress?: () => void;
}
// Beautiful Animated Toggle Component
const AnimatedToggle: React.FC<{ isDarkMode: boolean; onToggle: () => void }> = ({ isDarkMode, onToggle }) => {
  const animatedValue = useRef(new Animated.Value(isDarkMode ? 1 : 0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: isDarkMode ? 1 : 0,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  }, [isDarkMode]);

  const handlePress = () => {
    // Scale animation for press feedback
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    onToggle();
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E5E7EB', '#1F2937'],
  });

  const moonOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const sunOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <Animated.View style={[styles.toggleContainer, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Animated.View style={[styles.toggleTrack, { backgroundColor }]}>
          {/* Sun Icon */}
          <Animated.View style={[styles.sunIcon, { opacity: sunOpacity }]}>
            <Text style={styles.sunText}>☀️</Text>
          </Animated.View>
          
          {/* Moon Icon */}
          <Animated.View style={[styles.moonIcon, { opacity: moonOpacity }]}>
            <Text style={styles.moonText}>🌙</Text>
          </Animated.View>
          
          {/* Animated Thumb */}
          <Animated.View
            style={[
              styles.toggleThumb,
              {
                transform: [{ translateX }],
                backgroundColor: isDarkMode ? '#F59E0B' : '#3B82F6',
                shadowColor: isDarkMode ? '#F59E0B' : '#3B82F6',
              }
            ]}
          >
            <View style={styles.thumbGlow} />
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const Header: React.FC<HeaderProps> = ({
    title,
    isDarkMode, 
    onToggleTheme,
    showBackButton = true,
    onBackPress
}) => {
    const navigation = useNavigation();
    
    const handleBackPress = () => {
        try {
            if (onBackPress) {
                // Use custom back press handler if provided
                onBackPress();
            } else {
                // Default navigation behavior
                if (navigation.canGoBack()) {
                    navigation.goBack();
                } else {
                    // Navigate to Home if no back stack
                    navigation.navigate('Home' as never);
                }
            }
        } catch (error) {
            console.log('Navigation error:', error);
            // Fallback to Home screen on error
            try {
                navigation.navigate('Home' as never);
            } catch (fallbackError) {
                console.log('Fallback navigation error:', fallbackError);
            }
        }
    };
    
    return (
        <View>
             <View style={[styles.header,isDarkMode&& styles.darkheader]}>
                {showBackButton ? (
                    <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                        <Text style={[styles.backArrow,isDarkMode&& styles.darkbackArrow]}>←</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.backButtonPlaceholder} />
                )}
                <Text style={[styles.headerTitle,isDarkMode&& styles.darkheaderTitle]}>{title}</Text>
                
                <AnimatedToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
     container: {
        flex: 1,
        backgroundColor: '#fff'
    },
     header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#f8f8f8',
    },
    backButton: {
        padding: 4,
        marginRight: 8,
    },
    backButtonPlaceholder: {
        width: 30,
        height: 30,
    },
    backArrow: {
        fontSize: 22,
        color: '#000',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    darkheader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#000',
    },
    darkbackArrow: {
        fontSize: 22,
        color: '#fff',
    },
    darkheaderTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color:"#fff"
    },
    // Animated Toggle Styles
    toggleContainer: {
        paddingVertical: 4,
        paddingHorizontal: 2,
    },
    toggleButton: {
        borderRadius: 20,
    },
    toggleTrack: {
        width: 50,
        height: 26,
        borderRadius: 13,
        position: 'relative',
        justifyContent: 'center',
        paddingHorizontal: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    toggleThumb: {
        width: 22,
        height: 22,
        borderRadius: 11,
        position: 'absolute',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbGlow: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        position: 'absolute',
    },
    sunIcon: {
        position: 'absolute',
        left: 4,
        top: 1,
        zIndex: 1,
    },
    moonIcon: {
        position: 'absolute',
        right: 4,
        top: 1,
        zIndex: 1,
    },
    sunText: {
        fontSize: 16,
        textAlign: 'center',
    },
    moonText: {
        fontSize: 16,
        textAlign: 'center',
    },
})

export default Header;
