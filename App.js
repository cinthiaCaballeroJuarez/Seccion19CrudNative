import 'react-native-gesture-handler';
import React from 'react';

//import {StyleSheet, Text, View} from 'react-native';
import Inicio from './Views/Inicio';
import DetalleCliente from './Views/DetalleCliente';
import NuevoCliente from './Views/NuevoCliente';
//import BarraSuperior from './components/ui/Barra';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
//import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

// Definir el tema
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655BF',
  },
};

//console.log(theme.colors);
const App = () => {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Inicio"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: theme.colors.surface,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
            <Stack.Screen
              name="Inicio"
              component={Inicio}
              /*
              options={({navigation, route}) => ({
                headerTitleAlign: 'center',
                headerLeft: props => (
                  <BarraSuperior
                    {...props}
                    navigation={navigation}
                    route={route}
                  />
                ),
              })}*/
            />

            <Stack.Screen
              name="Nuevo Cliente"
              component={NuevoCliente}
              options={{
                title: 'Nuevo Cliente',
              }}
            />

            <Stack.Screen
              name="Detalle Cliente"
              component={DetalleCliente}
              options={{
                title: 'Detalle Cliente',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

/*
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
*/
export default App;
