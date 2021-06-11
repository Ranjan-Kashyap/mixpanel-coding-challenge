import * as React from 'react';
// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// Components
import {WelcomeScreen} from '../components/screens/WelcomeScreen';
import {ScreenA} from '../components/screens/ScreenA';
import {ScreenB} from '../components/screens/ScreenB';
import {ScreenF} from '../components/screens/ScreenF';
const Stack = createStackNavigator();

const withInitialScreen = 'Welcome';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={withInitialScreen} headerMode="none">
        <Stack.Screen name="Welcome">
          {props => (
            <WelcomeScreen
              {...props}
              introEmoji={'🎶'}
              title={'Welcome to Skoove`s coding Challenge'}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="A" component={ScreenA} />
        <Stack.Screen name="B" component={ScreenB} />
        <Stack.Screen name="Final" component={ScreenF} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
