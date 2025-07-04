import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppTabRoutesParamList } from "../@types/navigation";
import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { Resume } from "../screens/Resume";
import { Feather } from '@expo/vector-icons';
import theme from "../global/styles/theme";

const { Navigator, Screen } = createBottomTabNavigator<AppTabRoutesParamList>();

export function AppRoutes() {
    return (
        <Navigator id={undefined}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.warning,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 10,
                    paddingTop: 10,
                    borderTopWidth: 0,
                },
            }}
        >
            <Screen
                name="Listagem"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Feather
                            name="list"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Screen
                name="Cadastrar"
                component={Register}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Feather
                            name="dollar-sign"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Screen
                name="Resumo"
                component={Resume}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Feather
                            name="pie-chart"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </Navigator>
    );
}