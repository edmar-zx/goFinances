// src/routes/index.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppRoutes } from './app.routes';
import { Login } from '../screens/Login';

export type RootStackParamList = {
  AppTabs: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}  id={undefined}>
      <Stack.Screen name="AppTabs" component={AppRoutes} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

