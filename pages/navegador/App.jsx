import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TelaInicial } from '../telaInicial/app';
import { CalculoParcelasIguais } from '../parcelasIguais/App';
import { CalculoComEntrada } from '../parcelaComEntrada/App';
import { CalculoSemEntrada } from '../parcelaSemEntrada/App';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaInicial">
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="CalculoParcelasIguais" component={CalculoParcelasIguais} />
        <Stack.Screen name="CalculoComEntrada" component={CalculoComEntrada} />
        <Stack.Screen name="CalculoSemEntrada" component={CalculoSemEntrada} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
