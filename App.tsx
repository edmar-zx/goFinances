import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_900Black,
} from '@expo-google-fonts/poppins';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes';

import Toast, { ToastConfig } from 'react-native-toast-message';
import { CustomToast } from './src/components/CustomToast';

const toastConfig: ToastConfig = {
  success: (props) => <CustomToast {...props} type="success" />,
  error: (props) => <CustomToast {...props} type="error" />,
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppRoutes />
        <Toast config={toastConfig}  />
      </NavigationContainer>
    </ThemeProvider>
  );
}