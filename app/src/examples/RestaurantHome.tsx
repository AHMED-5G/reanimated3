/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-no-duplicate-props */
//https://reanimated-beta-docs.swmansion.com/docs/animations/withTiming
import {
  StatusBar,
  Text,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  useDerivedValue,
  useAnimatedProps,
  FadeIn,
  interpolateColor,
  FadeInRight,
  Extrapolate,
} from 'react-native-reanimated';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { ParamListBase, useIsFocused } from '@react-navigation/native';
import RestaurantHeader from './SharedElementTransitions/RestaurantComponents/RestaurantHeader';
import RestaurantCategories from './SharedElementTransitions/RestaurantComponents/RestaurantComponents';
import KingSizeBurger from './SharedElementTransitions/RestaurantComponents/KingSizeBurger';
import SpecialOffers from './SharedElementTransitions/RestaurantComponents/SpecialOffers';
import RestaurantNavBar from './SharedElementTransitions/RestaurantComponents/RestaurantNavBar';
import { Easing } from 'react-native-reanimated';
import {
  BurgerInterface,
  easiBezi,
  easiBeziCounter,
  height,
  restaurantTransition,
  width,
  yellowColor,
} from './SharedElementTransitions/RestaurantComponents/restaurantConstants';
import SecondScreenHeader from './SharedElementTransitions/RestaurantComponents/SecondScreenHeader';
import BurgerInformation from './SharedElementTransitions/RestaurantComponents/BurgerInformation';
import RestaurantBottomSheet from './SharedElementTransitions/RestaurantComponents/RestaurantBottomSheet';
import RestaurantTopSheet from './SharedElementTransitions/RestaurantComponents/RestayrantTopSheet';

function Screen1({ navigation }: NativeStackScreenProps<ParamListBase>) {
  const isFocused = useIsFocused();
  useEffect(() => {
    // isFocused;
  }, [isFocused]);

  const homeFadeInProgress = useSharedValue(0);
  const homeFadeOutProgress = useSharedValue(0);

  const homeFadeInRStyle = useAnimatedStyle(() => {
    const toTop = interpolate(homeFadeInProgress.value, [0, 1], [500, 0]);
    return {
      top: toTop,
    };
  });
  const topSectionRStyle = useAnimatedStyle(() => {
    const toTop = interpolate(homeFadeOutProgress.value, [0, 1], [-200, 0]);
    return {
      top: toTop,
    };
  });

  useEffect(() => {
    homeFadeInProgress.value = withTiming(1, {
      duration: 700,
      easing: Easing.bezier(0.26, 0.85, 0.62, 0.94),
    });
    homeFadeOutProgress.value = withTiming(1, {
      duration: 700,
      easing: Easing.bezier(0.26, 0.85, 0.62, 0.94),
    });
  }, []);

  function homeFadeOut() {
    homeFadeOutProgress.value = withTiming(1);
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={yellowColor} translucent={false} />
      <View style={{ flex: 1 }}>
        <Animated.View style={topSectionRStyle}>
          <RestaurantHeader />
          <View style={{ marginTop: 10 }}>
            <RestaurantCategories />
          </View>
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
        </Animated.View>
        <Animated.View style={homeFadeInRStyle}>
          <Animated.View
            entering={FadeInDown.duration(1200).overshootClamping(11)}
            style={{ marginLeft: 20, marginTop: 20 }}>
            <SpecialOffers navigation={navigation} homeFadeOut={homeFadeOut} />
          </Animated.View>
        </Animated.View>
      </View>
      <RestaurantNavBar />
    </View>
  );
}

const initialBottomSheetPercentageOpen = 0.6;

function Screen2({ route, navigation }: NativeStackScreenProps<ParamListBase>) {
  const { burger } = route.params;
  const openBottomSheetProgress = useSharedValue(0);
  const openTopSheetProgress = useSharedValue(0);

  useEffect(() => {
    openBottomSheetProgress.value = withDelay(
      200,
      withTiming(initialBottomSheetPercentageOpen, {
        duration: 1000,
        easing: Easing.bezier(0.26, 0.85, 0.62, 0.94),
      })
    );
  }, []);

  const imageRStyle = useAnimatedStyle(() => {
    const toTop = interpolate(openBottomSheetProgress.value, [0, 1], [0, -200]);

    return {
      top: toTop,
      backgroundColor: 'black',
    };
  });
  const [price] = useState(burger.price);

  const sharedValue = useSharedValue(0);
  const decimalSharedValue = useSharedValue(0);

  function getCurrentDecimalPart(price: number): number {
    const decimal = price.toString().split('.')[1];
    return +decimal ?? 0;
  }

  const [drivenValue, setDrivenValue] = useState(1);
  const text = useDerivedValue(() => {
    return Math.round(sharedValue.value * Math.floor(price)).toString();
  }, [drivenValue]);

  useEffect(() => {
    animateDecimalValue(handelDecimalNumber(burger.price));
  }, []);

  const decimalText = useDerivedValue(() => {
    return Math.round(decimalSharedValue.value).toString();
  });

  const integerAnimatedProps = useAnimatedProps(() => {
    return { text: text.value } as TextInputProps;
  });

  const decimalAnimatedProps = useAnimatedProps(() => {
    return { text: decimalText.value } as TextInputProps;
  });

  const [lastCost, setLastCost] = useState(+burger.price);

  function setLength(number: number): number {
    return number.toString().length === 2 ? 0.01 : 0.1;
  }

  function handelDecimalNumber(number: number): number {
    const value =
      getCurrentDecimalPart(number) * setLength(getCurrentDecimalPart(number));
    return +value;
  }

  function animateDecimalValue(number: number) {
    decimalSharedValue.value = withTiming(number * 100, {
      duration: 2000,
      easing: easiBeziCounter,
    });
  }

  function animateIntegerValue() {
    sharedValue.value = withTiming(drivenValue, {
      duration: 2000,
      easing: easiBeziCounter,
    });
  }

  useEffect(() => {
    animateIntegerValue();
  }, [drivenValue]);

  function addValue(newValue: number) {
    scaleUp();
    if (newValue > 1) {
    } else if (newValue < 1) {
      if (handelDecimalNumber(newValue) + handelDecimalNumber(lastCost) > 1) {
        let temp: number = Math.abs(
          handelDecimalNumber(newValue) + handelDecimalNumber(lastCost) - 1
        );
        setDrivenValue((prev) => prev + 1 / Math.floor(price));

        if (+temp < handelDecimalNumber(lastCost)) {
          animateDecimalValue(+temp.toFixed(2));
        } else {
        }
      } else {
        animateDecimalValue(
          handelDecimalNumber(newValue) + handelDecimalNumber(lastCost)
        );
      }
    } else if (newValue === 1) {
      setDrivenValue((prev) => prev + 1 / Math.floor(price));
    }
    setLastCost((prev) => prev + newValue);
  }

  const scalePriceContainerUpProgress = useSharedValue(0);

  function scaleUp() {
    scalePriceContainerUpProgress.value = withTiming(
      1,
      { duration: 100, easing: easiBezi },
      (isFinished) => {
        if (isFinished) {
          scalePriceContainerUpProgress.value = withTiming(0, {
            duration: 100,
            easing: easiBezi,
          });
        }
      }
    );
  }

  const addToCartButtonRStyle = useAnimatedStyle(() => {
    const toBackground = interpolateColor(
      openBottomSheetProgress.value,
      [0.2, 0],
      [yellowColor, 'white']
    );

    return {
      backgroundColor: toBackground,
    };
  });
  const scaleButtonProgress = useSharedValue(0);

  const scaleButtonRStyle = useAnimatedStyle(() => {
    const toScale = interpolate(
      scaleButtonProgress.value,
      [0, 1],
      [1, 0.8],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        {
          scale: toScale,
        },
      ],
    };
  });

  function scaleButton() {
    scaleButtonProgress.value = withTiming(
      1,
      {
        duration: 100,
        //  velocity: 10, overshootClamping: false
      },
      (isFinished) => {
        if (isFinished) {
          scaleButtonProgress.value = withTiming(0, {
            duration: 100,
            // velocity: 10,
            // overshootClamping: false,
          });
        }
      }
    );
  }

  const GoToMenuTextRStyle = useAnimatedStyle(() => {
    const toOpacity = interpolate(
      openBottomSheetProgress.value,
      [0.2, 0],
      [0, 1]
    );
    return {
      opacity: toOpacity,
    };
  });

  const addToCartTextRStyle = useAnimatedStyle(() => {
    const toOpacity = interpolate(
      openBottomSheetProgress.value,
      [0.2, 0],
      [1, 0]
    );
    return {
      opacity: toOpacity,
    };
  });

  function handelWhiteYellowActions() {
    scaleButton();
    if (openBottomSheetProgress.value > 0) {
      openBottomSheetProgress.value = withTiming(0);
      openTopSheet();
    } else {
      navigation.navigate('Screen1');
    }
  }

  function openTopSheet() {
    openTopSheetProgress.value = withTiming(1, {
      duration: 1000,
      easing: easiBeziCounter,
    });
  }
  const burgerNameTextRStyle = useAnimatedStyle(() => {
    const toColor = interpolateColor(
      openTopSheetProgress.value,
      [0.25, 1],
      ['white', 'black']
    );
    const toFontSize = interpolate(
      openTopSheetProgress.value,
      [0.25, 1],
      [38, 28]
    );
    return {
      color: toColor,
      fontSize: toFontSize,
    };
  });
  const headerRStyle = useAnimatedStyle(() => {
    const toOpacity = interpolate(
      openTopSheetProgress.value,
      [0, 0.25],
      [1, 0]
    );
    return { opacity: toOpacity };
  });
  const burgerNameContainerRStyle = useAnimatedStyle(() => {
    const toTop = interpolate(openTopSheetProgress.value, [0.25, 1], [80, 50]);
    return {
      top: toTop,
    };
  });
  const AnimatedToucchable = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <StatusBar backgroundColor={'black'} />

      <RestaurantTopSheet openTopSheetProgress={openTopSheetProgress} />
      <Animated.View
        style={[
          { position: 'absolute', left: 20, top: 80, zIndex: 1 },
          burgerNameContainerRStyle,
        ]}>
        <Animated.Text
          style={[
            { color: 'white', fontSize: 38, fontWeight: 'bold' },
            burgerNameTextRStyle,
          ]}>
          {burger.name.split(' ')[0]}
        </Animated.Text>
        <Animated.Text
          entering={FadeInRight.duration(1200)}
          style={[
            { color: 'white', fontSize: 38, fontWeight: 'bold' },
            burgerNameTextRStyle,
          ]}>
          {burger.name.split(' ')[1]}
        </Animated.Text>
      </Animated.View>
      <Animated.View
        style={[
          {
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            opacity: 0,
          },
          headerRStyle,
        ]}>
        <SecondScreenHeader navigation={navigation} />
      </Animated.View>
      <Animated.View style={headerRStyle}>
        <BurgerInformation
          scalePriceContainerUpProgress={scalePriceContainerUpProgress}
          addValue={addValue}
          burger={burger as BurgerInterface}
          {...{ text, decimalText, integerAnimatedProps, decimalAnimatedProps }}
        />
      </Animated.View>
      <Animated.View
        style={[
          {
            position: 'absolute',
            zIndex: -1,
          },
          imageRStyle,
        ]}>
        <Animated.Image
          sharedTransitionTag={burger.id}
          sharedTransitionStyle={restaurantTransition}
          source={{
            uri: 'https://images.unsplash.com/photo-1603064752734-4c48eff53d05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
          }}
          style={[{ width: width, height: height }]}
        />
      </Animated.View>
      <View
        style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
        <Animated.View
          // onPress={() => handelWhiteYellowActions()}
          style={[
            {
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              backgroundColor: yellowColor,
              width: width * 0.9,
              height: 50,
              borderRadius: 5,
              position: 'absolute',
              zIndex: 1,
              bottom: 15,
            },
            addToCartButtonRStyle,
            scaleButtonRStyle,
          ]}
          entering={FadeInDown.delay(600).duration(500)}>
          <Animated.View
            entering={FadeIn.duration(1000)}
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              width: width * 0.8,
            }}>
            <AnimatedToucchable
              onPress={() => {}}
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Animated.View
                style={[
                  {
                    position: 'absolute',
                    top: -15,
                    // left: -50,
                  },
                  addToCartTextRStyle,
                ]}>
                <TouchableOpacity
                  // disabled
                  style={{
                    height: '100%',
                    width: width * 0.8,
                    // backgroundColor: yellowColor,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => handelWhiteYellowActions()}>
                  {/* onPress={() => (openBottomSheetProgress.value = withTiming(0))}> */}
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 22,
                    }}>
                    Add to cart
                  </Text>
                </TouchableOpacity>
              </Animated.View>
              <Animated.View
                style={[
                  {
                    position: 'absolute',
                    top: -15,
                    left: -50,
                  },
                  GoToMenuTextRStyle,
                ]}>
                <TouchableOpacity
                  style={{}}
                  // disabled
                  onPress={() => handelWhiteYellowActions()}
                  // onPress={() => navigation.navigate('screen1')}
                >
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 22,
                    }}>
                    Go to menu
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </AnimatedToucchable>
          </Animated.View>
        </Animated.View>
        <RestaurantBottomSheet
          addValue={addValue}
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
