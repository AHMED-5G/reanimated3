import { FlatList, Text, View } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  BurgerInterface,
  priceBackgroundColor,
  restaurantTransition,
} from './restaurantConstants';

const SpecialOffers = ({ navigation }: any) => {
  const specialOffersList: BurgerInterface[] = [
    {
      name: 'Cheese Burger',
      price: 3.15,
      image:
        'https://images.unsplash.com/photo-1603064752734-4c48eff53d05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      // image:
      //   'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      weight: 325,
    },
    {
      name: 'BBQ Burger',
      price: 3.15,
      image:
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=699&q=80',
      weight: 325,
    },
    {
      name: 'Hot Burger ',
      price: 4.6,
      image:
        'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      weight: 325,
    },
  ];

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
          data={specialOffersList}
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
                onPress={() =>
                  navigation.navigate('Screen2', { burger: item })
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
          keyExtractor={(item) => item.name}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default SpecialOffers;

// const styles = StyleSheet.create({});
