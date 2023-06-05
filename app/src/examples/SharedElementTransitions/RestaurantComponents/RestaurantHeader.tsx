/* eslint-disable react/self-closing-comp */
import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { height, width, yellowColor } from './restaurantConstants';

const RestaurantHeader = () => {
  return (
    <View
      style={{
        backgroundColor: yellowColor,
        height: height * 0.15,
        justifyContent: 'space-evenly',
      }}>
      <View style={{ marginTop: 25, marginLeft: 10 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>
          TASTYBURGER
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'space-evenly',

          flex: 1,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              width: width / 2,
            }}>
            <Text style={styles.tabText}>Menu</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              width: width / 2,
            }}>
            <Text style={[styles.tabText, { color: undefined }]}>
              Create burger
            </Text>
          </View>
        </View>
      </View>
      <View style={{ height: 3, backgroundColor: 'black', width: width / 2 }} />
    </View>
  );
};

export default RestaurantHeader;

const styles = StyleSheet.create({
  tabText: {
    fontSize: 16,
    fontWeight: '800',
    color: 'black',
  },
});
