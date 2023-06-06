import {
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import { height, width, yellowColor } from './restaurantConstants';
import { TextInput } from 'react-native-gesture-handler';

type Props = { openTopSheetProgress: SharedValue<number> };

const RestaurantTopSheet = ({ openTopSheetProgress }: Props) => {
  const topSheetHeight = height * 0.18;
  const topSheetRStyle = useAnimatedStyle(() => {
    const toTop = interpolate(
      openTopSheetProgress.value,
      [0.25, 1],
      [-topSheetHeight, 0]
    );
    return {
      backgroundColor: yellowColor,
      top: toTop,
      height: topSheetHeight,
      width,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      position: 'absolute',
      zIndex: 1,
    };
  });
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  const text = useDerivedValue(() => {
    return Math.round(openTopSheetProgress.value * Math.floor(4)).toString();
  });
  const decimalText = useDerivedValue(() => {
    return Math.round(openTopSheetProgress.value * 65).toString();
  });

  const integerAnimatedProps = useAnimatedProps(() => {
    return { text: text.value } as TextInputProps;
  });
  const decimalAnimatedProps = useAnimatedProps(() => {
    return { text: decimalText.value } as TextInputProps;
  });
  useEffect(() => {}, []);

  return (
    <Animated.View style={topSheetRStyle}>
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{ width: width * 0.9, marginTop: 20 }}>
          <Text style={{ color: 'black', fontSize: 16 }}>
            3 items in your cart
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 60,
            left: width / 3 + 20,
            flexDirection: 'row',
          }}>
          <Animated.View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: 'bold',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                $
              </Text>
            </View>
            <AnimatedTextInput
              underlineColorAndroid="transparent"
              editable={false}
              value={text.value}
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
              }}
              animatedProps={integerAnimatedProps}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: -10,
              }}>
              .
            </Text>
            <AnimatedTextInput
              underlineColorAndroid="transparent"
              editable={false}
              value={decimalText.value}
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
                // marginLeft: -4,
              }}
              animatedProps={decimalAnimatedProps}
            />
          </Animated.View>
          <View style={{ flexDirection: 'row', marginLeft: 20 }}>
            <TouchableOpacity
              style={styles.plusMinusButtons}
              onPress={() => {}}>
              <Text style={styles.plusMinusText}>-</Text>
            </TouchableOpacity>
            <View
              style={[styles.plusMinusButtons, { backgroundColor: undefined }]}>
              <Text
                style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>
                {1}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.plusMinusButtons}
              onPress={() => {}}>
              <Text style={styles.plusMinusText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default RestaurantTopSheet;

const styles = StyleSheet.create({
  plusMinusButtons: {
    width: 38,
    height: 38,
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
