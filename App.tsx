/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import { StatusBar, StyleSheet, useColorScheme, View,SafeAreaView } from 'react-native';
import HomeScreen from './src/screen/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskScreen1 from './src/screen/TaskScreen1';
import TaskScreen2 from './src/screen/TaskScreen2';
import PostForm from './src/screen/PostForm';
import { Provider } from 'react-redux';
import { store } from './src/store/Store';
import { ThemeProvider } from './src/context/ThemeContext';

function App() {
 
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
         <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}/>
             <Stack.Screen name="screen1" component={TaskScreen1}  options={{ headerShown: false }}/>
              <Stack.Screen name="screen2" component={TaskScreen2}  options={{ headerShown: false }}/>
              <Stack.Screen name="PostForm" component={PostForm} options={{headerShown:false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
