/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-no-duplicate-props */
//https://reanimated-beta-docs.swmansion.com/docs/animations/withTiming
import { StatusBar, View } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import RestaurantHeader from './SharedElementTransitions/RestaurantComponents/RestaurantHeader';
import RestaurantCategories from './SharedElementTransitions/RestaurantComponents/RestaurantComponents';
import KingSizeBurger from './SharedElementTransitions/RestaurantComponents/KingSizeBurger';
import SpecialOffers from './SharedElementTransitions/RestaurantComponents/SpecialOffers';
import RestaurantNavBar from './SharedElementTransitions/RestaurantComponents/RestaurantNavBar';
import { Easing } from 'react-native-reanimated';
import {
  BurgerInterface,
  height,
  restaurantTransition,
  width,
  yellowColor,
} from './SharedElementTransitions/RestaurantComponents/restaurantConstants';
import SecondScreenHeader from './SharedElementTransitions/RestaurantComponents/SecondScreenHeader';
import BurgerInformation from './SharedElementTransitions/RestaurantComponents/BurgerInformation';
import RestaurantBottomSheet from './SharedElementTransitions/RestaurantComponents/RestaurantBottomSheet';

function Screen1({ navigation }: NativeStackScreenProps<ParamListBase>) {
  const homeFadeInProgress = useSharedValue(0);

  const homeFadeInRStyle = useAnimatedStyle(() => {
    const toTop = interpolate(homeFadeInProgress.value, [0, 1], [500, 0]);
    return {
      top: toTop,
    };
  });

  useEffect(() => {
    homeFadeInProgress.value = withTiming(1, {
      duration: 700,
      easing: Easing.bezier(0.26, 0.85, 0.62, 0.94),
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={yellowColor} translucent={false} />
      <View style={{ flex: 1 }}>
        <RestaurantHeader />
        <View style={{ marginTop: 10 }}>
          <RestaurantCategories />
        </View>
        <Animated.View style={homeFadeInRStyle}>
          <Animated.View
            entering={FadeInDown.duration(1000)}
            style={{
              marginTop: 40,
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <KingSizeBurger />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(1200).overshootClamping(11)}
            style={{ marginLeft: 20, marginTop: 20 }}>
            <SpecialOffers navigation={navigation} />
          </Animated.View>
        </Animated.View>
      </View>
      <RestaurantNavBar />
    </View>
  );
}

function Screen2({ route, navigation }: NativeStackScreenProps<ParamListBase>) {
  const { burger } = route.params;
  const openBottomSheetProgress = useSharedValue(0);

  useEffect(() => {
    openBottomSheetProgress.value = withDelay(
      200,
      withTiming(0.5, {
        duration: 1000,
        easing: Easing.bezier(0.26, 0.85, 0.62, 0.94),
      })
    );
  }, []);

  const imageRStyle = useAnimatedStyle(() => {
    const toTop = interpolate(openBottomSheetProgress.value, [0, 1], [0, -200]);
    return {
      top: toTop,
    };
  });

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <StatusBar backgroundColor={'black'} />
      <SecondScreenHeader navigation={navigation} />
      <BurgerInformation burger={burger as BurgerInterface} />
      <Animated.View
        style={[
          {
            position: 'absolute',
            zIndex: -1,
          },
          imageRStyle,
        ]}>
        <Animated.Image
          sharedTransitionTag={'Cheese Burger'}
          sharedTransitionStyle={restaurantTransition}
          source={{
            uri: 'https://images.unsplash.com/photo-1603064752734-4c48eff53d05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            // uri: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
          }}
          style={[{ width: width, height: height }]}
        />
      </Animated.View>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <RestaurantBottomSheet
          openBottomSheetProgress={openBottomSheetProgress}
        />
      </View>
    </View>
  );
}
const Stack = createNativeStackNavigator();

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
