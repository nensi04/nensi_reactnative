
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View,Text, TouchableOpacity, SafeAreaView } from 'react-native';

const HomeScreen = () => {
    const navigation=useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.button}
               
            >
                <Text style={styles.buttonText}  onPress={() => navigation.navigate('screen1' as never)}> Task 1</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button }
               
            >
                <Text style={styles.buttonText}  onPress={() => navigation.navigate('screen2' as never)}> Task 2</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        padding: 20,
    },
     button: {
        backgroundColor: '#2196F3',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
})

export default HomeScreen;
