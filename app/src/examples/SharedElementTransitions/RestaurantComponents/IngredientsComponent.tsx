import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { width } from './restaurantConstants';
import { IngredientType } from './RestaurantBottomSheet';

type Props = { item: IngredientType };

const IngredientsComponent = ({ item }: Props) => {
  const [counter, setCounter] = useState(0);
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
        width: width * 0.9,
      }}>
      <View>
        <Text style={{ color: 'black', fontSize: 20 }}>{item.name}</Text>
        <Text style={{ color: 'black' }}>${item.price}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={styles.plusMinusButtons}
          onPress={() => setCounter((prev) => prev - 1)}>
          <Text style={styles.plusMinusText}>-</Text>
        </TouchableOpacity>
        <View style={[styles.plusMinusButtons, { backgroundColor: 'white' }]}>
          <Text style={{ color: 'black', fontSize: 20 }}>{counter}</Text>
        </View>
        <TouchableOpacity
          style={styles.plusMinusButtons}
          onPress={() => setCounter((prev) => prev + 1)}>
          <Text style={styles.plusMinusText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IngredientsComponent;

const styles = StyleSheet.create({
  plusMinusButtons: {
    width: 50,
    height: 50,
    backgroundColor: '#EEE',
    borderRadius: 5,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  plusMinusText: {
    color: 'black',
    fontSize: 30,
  },
});
