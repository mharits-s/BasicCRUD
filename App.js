import { Text, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { AboutScreen, TaskCompletedScreen, TaskScreen } from './screens';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HeaderStyle = {
  headerStyle: {
    backgroundColor: '#202A44',
  },
  headerTintColor: '#DDDBCB',
};

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Task') {
            iconName = 'tasks';
          } else if (route.name === 'Completed') {
            iconName = 'clipboard-check';
          } else if (route.name === 'About') {
            iconName = 'exclamation-circle';
          }
          return (
            <FontAwesome5
              name={iconName}
              size={size}
              color={focused ? '#FB8500' : color}
            />
          );
        },
        tabBarIconStyle: { marginTop: 10 },
        tabBarLabel: ({ children, color, focused }) => {
          return (
            <Text style={{ marginBottom: 10, color: focused ? '#FB8500' : color }}>
              {children}
            </Text>
          );
        },
        tabBarStyle: {
          height: 70,
          borderTopWidth: 0,
          backgroundColor: '#202A44',
        },
      })}
    >
      <Tab.Screen
        name="Task"
        component={TaskScreen}
        options={{ title: 'All Task', unmountOnBlur: true, ...HeaderStyle}}
      />
      <Tab.Screen
        name="Completed"
        component={TaskCompletedScreen}
        options={{ unmountOnBlur: true, ...HeaderStyle}}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{ unmountOnBlur: true, ...HeaderStyle}}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomNavigator"
          component={BottomNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <View style={styles.cardContainer}>
        <Text style={styles.name}>Muhammad Harits S. A.</Text>
        <Text style={styles.nim}>1203210003</Text>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    top: 35,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 10,
  },
  name: {
    color: 'white',
    fontSize: 16,
  },
  nim: {
    textAlign: 'right',
    color: 'white',
    fontSize: 12,
  },
});

export default App;
