import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { yellowColor } from './restaurantConstants';

const RestaurantCategories = () => {
  const catagories = ['Cheese', 'Chicken', 'Fish', 'Vegetarian'];
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.categoryContainer}>
        <Image
          source={{
            uri: 'https://cdn.iconscout.com/icon/free/png-256/free-options-1768025-1502199.png',
          }}
          style={{
            height: 30,
            width: 30,
            margin: 5,
            transform: [
              {
                rotate: '90deg',
              },
            ],
          }}
        />
      </View>
      {catagories.map((category, index) => (
        <View style={styles.categoryContainer} key={index}>
          <Text
            style={{
              margin: 10,
              fontSize: 15,
              fontWeight: '700',
              color: 'black',
            }}>
            {category}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default RestaurantCategories;

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: yellowColor,
    height: 40,
    // width: 40,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 20,
  },
});
