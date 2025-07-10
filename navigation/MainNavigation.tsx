import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "../screens/LoginScreen";
import { RegistroScreen } from "../screens/RegistroScreen";
import { TareasScreen } from "../screens/TareasScreen";
import { CompletarScreen } from "../screens/CompletarScreen";
import { CrearScreen } from "../screens/CrearScreen";
import { EliminarScreen } from "../screens/EliminarScreen";
import { EditarScreen } from "../screens/EditarScreen";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Tab"
        component={MyTab}
      />
    </Stack.Navigator>
  );
};

const MyTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon: () => <Feather name="list" size={24} color="black" />,
        }}
        name="Lista"
        component={TareasScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => <AntDesign name="book" size={24} color="black" />,
        }}
        name="Tareas"
        component={MyTop}
      />
    </Tab.Navigator>
  );
};
const MyTop = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Crear" component={CrearScreen} />
      <TopTab.Screen name="Completar" component={CompletarScreen} />
      <TopTab.Screen name="Eliminar" component={EliminarScreen} />
      <TopTab.Screen name="Editar" component={EditarScreen} />
    </TopTab.Navigator>
  );
};
export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};
