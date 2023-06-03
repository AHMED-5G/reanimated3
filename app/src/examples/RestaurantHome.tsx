/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-no-duplicate-props */
import { View, Button } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import RestaurantHeader from './SharedElementTransitions/ResturantComponents/RestaurantHeader';
import RestaurantCategories from './SharedElementTransitions/ResturantComponents/RestaurantCategories';
function Screen1({ navigation }: NativeStackScreenProps<ParamListBase>) {
  return (
    <View>
      <RestaurantHeader />
      <View style={{ marginTop: 10 }}>
        <RestaurantCategories />
      </View>
      <Animated.Image
        sharedTransitionTag={'1111'}
        source={{
          uri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=699&q=80',
        }}
        style={{ width: 100, height: 100 }}
      />
      <Button
        onPress={() => navigation.navigate('Screen2')}
        title="go to screen2"
      />
    </View>
  );
}

function Screen2({}: NativeStackScreenProps<ParamListBase>) {
  return (
    <View>
      <Animated.Image
        sharedTransitionTag={'1111'}
        source={{
          uri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=699&q=80',
        }}
        style={{ marginTop: 100, width: 200, height: 200 }}
      />
    </View>
  );
}
const Stack = createNativeStackNavigator();
// const styles = StyleSheet.create({});
export default function RestaurantHome() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'default',
      }}>
      <Stack.Screen
        name="Screen1"
        component={Screen1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Screen2"
        component={Screen2}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
