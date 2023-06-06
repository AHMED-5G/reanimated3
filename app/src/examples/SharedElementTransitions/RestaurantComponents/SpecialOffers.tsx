import { FlatList, Text, View } from 'react-native';
import React, { useState } from 'react';
import Animated from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  priceBackgroundColor,
  restaurantTransition,
} from './restaurantConstants';
import { specialOffersList } from './data';

const SpecialOffers = ({ navigation }: any) => {
  const [list, setList] = useState(specialOffersList);

  return (
    <View>
      <Text
        style={{
          fontSize: 22,
          color: 'black',
          fontWeight: 'bold',
        }}>
        SPECIAL OFFERS
      </Text>
      <View style={{ marginTop: 10 }}>
        <FlatList
          horizontal
          data={list}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  width: 150,
                  height: 190,
                  marginRight: 20,
                  borderRadius: 5,
                  overflow: 'hidden',
                }}
                activeOpacity={1}
                onPress={
                  // () => navigation.navigate('Screen2', { burger: item })
                  () => {
                    navigation.navigate('Screen2', { burger: item });
                    setList(specialOffersList.reverse());
                  }
                }>
                <View
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 20,
                    zIndex: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'white',
                      fontWeight: '400',
                    }}>
                    {item.name}
                  </Text>
                  <View
                    style={{
                      backgroundColor: priceBackgroundColor,
                      width: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'white',
                        fontWeight: '600',
                        margin: 3,
                      }}>
                      ${item.price}
                    </Text>
                  </View>
                </View>
                <Animated.Image
                  sharedTransitionStyle={restaurantTransition}
                  sharedTransitionTag={item.name}
                  source={{
                    uri: item.image,
                  }}
                  style={{ width: '100%', height: '100%' }}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default SpecialOffers;

// const styles = StyleSheet.create({});
