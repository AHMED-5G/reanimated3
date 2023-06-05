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
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {
  addImage,
  cheeseImage,
  meatImage,
  onionImage,
  vegetarianImage,
} from './Images';
import CircularProgress from './cirular/circularProgress';
import IngredientsComponent from './IngredientsComponent';

type Props = { openBottomSheetProgress: SharedValue<number> };
export interface IngredientType {
  name: string;
  price: number;
}
export interface IngredientInterface {
  name: string;
  image: string;
  types?: IngredientType[];
}
const RestaurantBottomSheet = ({ openBottomSheetProgress }: Props) => {
  const [selectedIngredient, setSelectedIngredient] =
    useState<IngredientInterface>();
  const bottomSheetRStyle = useAnimatedStyle(() => {
    const toHeight = interpolate(
      openBottomSheetProgress.value,
      [0, 1],
      [0, height / 2]
    );

    return {
      height: toHeight,
    };
  });

  const ingredients: IngredientInterface[] = [
    {
      name: 'Onion',
      image: onionImage,
      types: [
        { name: 'Gauda', price: 0.5 },
        { name: 'Germantas', price: 0.15 },
        { name: 'Illertaler', price: 0.45 },
        { name: 'Comte', price: 0.26 },
      ],
    },
    {
      name: 'Vegetarian',

      image: vegetarianImage,
      types: [
        { name: 'Gauda', price: 0.5 },
        { name: 'Germantas', price: 0.15 },
        { name: 'Illertaler', price: 0.45 },
        { name: 'Comte', price: 0.26 },
      ],
    },
    {
      name: 'Cheese',

      image: cheeseImage,
      types: [
        { name: 'Gauda', price: 0.5 },
        { name: 'Germantas', price: 0.15 },
        { name: 'Illertaler', price: 0.45 },
        { name: 'Comte', price: 0.26 },
      ],
    },
    {
      name: 'Meat',

      image: meatImage,
      types: [
        { name: 'Gauda', price: 0.5 },
        { name: 'Germantas', price: 0.15 },
        { name: 'Illertaler', price: 0.45 },
        { name: 'Comte', price: 0.26 },
      ],
    },
    {
      name: 'Add',
      image: addImage,
      types: [
        { name: 'Gauda', price: 0.5 },
        { name: 'Germantas', price: 0.15 },
        { name: 'Illertaler', price: 0.45 },
        { name: 'Comte', price: 0.26 },
      ],
    },
  ];

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
          marginTop: 10,
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

      <View style={{ marginTop: 20 }}>
        <FlatList
          ref={flatListRef}
          data={ingredients}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginLeft: 20,
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
                    duration={1000}
                    progressValueColor={'white'}
                    maxValue={100}
                    titleStyle={{ fontWeight: 'bold' }}></CircularProgress>
                </View>

                <Image
                  source={item.image as ImageSourcePropType}
                  style={{ width: 80, height: 80, borderRadius: 100 }}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.name}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={{ marginTop: 10, marginLeft: 25 }}>
        <FlatList
          data={selectedIngredient?.types}
          renderItem={({ item }) => <IngredientsComponent item={item} />}
          keyExtractor={(item) => item.name}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </Animated.View>
  );
};

export default RestaurantBottomSheet;
