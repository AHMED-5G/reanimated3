import { ImageBackground, Text, View } from 'react-native';
import React from 'react';
import {
  priceBackgroundColor,
  width,
  yellowColor,
} from './restaurantConstants';

const KingSizeBurger = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: width * 0.9,
        borderRadius: 5,
        height: 250,
        backgroundColor: 'white',
        elevation: 4,
      }}>
      <View
        style={{
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          overflow: 'hidden',
        }}>
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1542574271-7f3b92e6c821?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGR1YmxlJTIwYnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
          }}
          resizeMethod="scale"
          style={{
            width: width / 2,
            height: '100%',
          }}>
          <View
            style={{
              marginTop: 20,
              marginLeft: 20,
              height: '80%',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: 70,
                height: 35,

                backgroundColor: priceBackgroundColor,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: 'white', fontSize: 22, fontWeight: '800' }}>
                $4.15
              </Text>
            </View>
            <View
              style={{
                backgroundColor: yellowColor,
                width: 60,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                // padding: 5,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: '600',
                  margin: 2,
                }}>
                525g
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            width: '80%',
          }}>
          <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 28 }}>
            King Size Burger
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            justifyContent: 'center',
            alignContent: 'center',
            width: '80%',
          }}>
          <Text>
            Egg, Mustard, Worcestershire sauce , Onion, Garlic, Medium, Ground
            Beef
          </Text>
        </View>
      </View>
    </View>
  );
};

export default KingSizeBurger;

// const styles = StyleSheet.create({});
