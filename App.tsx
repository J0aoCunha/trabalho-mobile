import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Auth } from './src/screens/Auth/index';
import { Home } from "./src/screens/Home";
import { Details } from "./src/screens/Details";
import { ForgotPassword } from "./src/screens/ForgotPassword";

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  Details: { groupId: number }; // Definindo os parâmetros para a tela de detalhes
  ForgotPassword: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" options={{headerShown:false}} component={Auth} />
        <Stack.Screen name="Home" options={{headerShown:false}} component={Home} />
        <Stack.Screen name="Details" options={{headerShown:false}} component={Details} />
        <Stack.Screen name="ForgotPassword" options={{headerShown:false}} component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
