
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Animated, Dimensions } from 'react-native';
import React, { useRef } from 'react';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
    const navigation = useNavigation();
    const scaleValue1 = useRef(new Animated.Value(1)).current;
    const scaleValue2 = useRef(new Animated.Value(1)).current;

    const handlePressIn = (scaleValue: Animated.Value) => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = (scaleValue: Animated.Value) => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Choose a Task</Text>
                <Text style={styles.headerSubtitle}>Select which task you'd like to work on</Text>
            </View>

            <View style={styles.buttonsContainer}>
                <Animated.View style={{ transform: [{ scale: scaleValue1 }] }}>
                    <TouchableOpacity
                        style={[styles.button, styles.task1Button]}
                        onPress={() => navigation.navigate('screen1' as never)}
                        onPressIn={() => handlePressIn(scaleValue1)}
                        onPressOut={() => handlePressOut(scaleValue1)}
                        activeOpacity={0.8}
                    >
                        <View style={styles.buttonIconContainer}>
                            <Text style={styles.buttonIcon}>📝</Text>
                        </View>
                        <Text style={styles.buttonTitle}>Task 1</Text>
                        <Text style={styles.buttonSubtitle}>First assignment</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View style={{ transform: [{ scale: scaleValue2 }] }}>
                    <TouchableOpacity
                        style={[styles.button, styles.task2Button]}
                        onPress={() => navigation.navigate('screen2' as never)}
                        onPressIn={() => handlePressIn(scaleValue2)}
                        onPressOut={() => handlePressOut(scaleValue2)}
                        activeOpacity={0.8}
                    >
                        <View style={styles.buttonIconContainer}>
                            <Text style={styles.buttonIcon}>🚀</Text>
                        </View>
                        <Text style={styles.buttonTitle}>Task 2</Text>
                        <Text style={styles.buttonSubtitle}>Second assignment</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundColor: '#f8fafc',
        padding: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 40,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 8,
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
        opacity: 0.8,
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
    },
    button: {
        width: width * 0.85,
        paddingVertical: 24,
        paddingHorizontal: 32,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        position: 'relative',
        overflow: 'hidden',
    },
    task1Button: {
        backgroundColor: '#4f46e5',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    task2Button: {
        backgroundColor: '#0ea5e9',
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    buttonIconContainer: {
        marginBottom: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon: {
        fontSize: 28,
    },
    buttonTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 6,
        textAlign: 'center',
    },
    buttonSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        fontWeight: '500',
    },
    // Legacy styles (keeping for backward compatibility)
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
})

export default HomeScreen;
