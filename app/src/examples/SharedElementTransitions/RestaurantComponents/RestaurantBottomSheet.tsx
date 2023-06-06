/* eslint-disable react/self-closing-comp */
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { easiBezi, height, width, yellowColor } from './restaurantConstants';
import Animated, {
  FadeIn,
  FadeInDown,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import CircularProgress from './cirular/circularProgress';
import IngredientsComponent from './IngredientsComponent';
import { ingredients } from './data';

type Props = {
  openBottomSheetProgress: SharedValue<number>;
  addValue: (number: number) => void;
};
export interface IngredientType {
  name: string;
  price: number;
}
export interface IngredientInterface {
  name: string;
  image: string;
  types?: IngredientType[];
}
const RestaurantBottomSheet = ({
  openBottomSheetProgress,
  addValue,
}: Props) => {
  const [selectedIngredient, setSelectedIngredient] =
    useState<IngredientInterface>();
  const bottomSheetRStyle = useAnimatedStyle(() => {
    const toHeight = interpolate(
      openBottomSheetProgress.value,
      [0, 1],
      [0, height / 2 - 10]
    );
    return {
      height: toHeight,
    };
  });

  const flatListRef = useRef<FlatList | null>(null);

  return (
    <Animated.View
      style={[
        {
          backgroundColor: 'white',
          height: height / 4,
          width,
          borderRadius: 10,
        },
        bottomSheetRStyle,
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 5,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>
            Ingredients
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            openBottomSheetProgress.value = withTiming(0);
          }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 7,
              marginTop: 7,
              borderRadius: 10,
              backgroundColor: '#EEE',
              width: 70,
            }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text>{'   '}</Text>
        </View>
      </View>

      <Animated.View style={{ marginTop: 10 }}>
        <FlatList
          ref={flatListRef}
          data={ingredients}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginLeft: 20,
                }}>
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setSelectedIngredient(item);
                    openBottomSheetProgress.value = withTiming(1, {
                      duration: 500,
                      easing: easiBezi,
                    });
                    flatListRef.current?.scrollToIndex({
                      animated: true,
                      index,
                      viewOffset: 120,
                    });
                  }}>
                  <View style={{ position: 'absolute' }}>
                    <CircularProgress
                      value={selectedIngredient?.name === item.name ? 100 : -1}
                      activeStrokeColor={
                        selectedIngredient?.name !== item.name
                          ? '#EEE'
                          : yellowColor
                      }
                      inActiveStrokeColor="#EEE"
                      activeStrokeWidth={5}
                      inActiveStrokeWidth={5}
                      radius={50}
                      duration={500}
                      progressValueColor={'white'}
                      maxValue={100}
                      titleStyle={{ fontWeight: 'bold' }}></CircularProgress>
                  </View>
                  <Image
                    resizeMethod="auto"
                    resizeMode="center"
                    source={item.image as ImageSourcePropType}
                    style={{ width: 80, height: 80, borderRadius: 100 }}
                  />
                </TouchableOpacity>
                <Text style={{ color: 'black', fontWeight: '600' }}>
                  {item.name}
                </Text>
              </View>
            );
          }}
          keyExtractor={(item) => item.name}
          showsHorizontalScrollIndicator={false}
        />
      </Animated.View>
      <Animated.View style={{ marginTop: 20, marginLeft: 25 }}>
        <FlatList
          data={selectedIngredient?.types}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInDown.duration(500 * index)}>
              <IngredientsComponent item={item} addValue={addValue} />
            </Animated.View>
          )}
          keyExtractor={(item) => item.name}
          showsHorizontalScrollIndicator={false}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default RestaurantBottomSheet;
