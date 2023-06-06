/* eslint-disable react-hooks/exhaustive-deps */
import { Text, TextInput, View } from 'react-native';
import React from 'react';
import { BurgerInterface, width, yellowColor } from './restaurantConstants';
import Animated, {
  FadeInRight,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

type Props = {
  burger: BurgerInterface;
  text: Readonly<Animated.SharedValue<string>>;
  decimalText: Readonly<Animated.SharedValue<string>>;
  integerAnimatedProps: Partial<{}>;
  decimalAnimatedProps: Partial<{}>;
  addValue: (n: number) => void;
  scalePriceContainerUpProgress: SharedValue<number>;
};

const BurgerInformation = ({
  burger,
  text,
  decimalText,
  integerAnimatedProps,
  decimalAnimatedProps,
  scalePriceContainerUpProgress,
}: Props) => {
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  const priceContainerRStyle = useAnimatedStyle(() => {
    const toScale = interpolate(
      scalePriceContainerUpProgress.value,
      [0, 1],
      [1, 1.5]
    );
    return {
      transform: [
        {
          scale: toScale,
        },
      ],
    };
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        width: width * 0.9,
        marginTop: 20,
        justifyContent: 'flex-start',
      }}>
      <View style={{ flex: 1 }}>
        <Animated.Text
          style={{ color: 'white', fontSize: 38, fontWeight: 'bold' }}>
          {burger.name.split(' ')[0]}
        </Animated.Text>
        <Animated.Text
          entering={FadeInRight.duration(1200)}
          style={{ color: 'white', fontSize: 38, fontWeight: 'bold' }}>
          {burger.name.split(' ')[1]}
        </Animated.Text>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          {burger.weight}g
        </Text>
        <Animated.View
          style={[
            {
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            },
            priceContainerRStyle,
          ]}>
          <View style={{}}>
            <Text
              style={{
                color: yellowColor,
                fontSize: 35,
                fontWeight: 'bold',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              $
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <AnimatedTextInput
              underlineColorAndroid="transparent"
              editable={false}
              value={text.value}
              style={{
                color: yellowColor,
                fontSize: 38,
                fontWeight: 'bold',
              }}
              animatedProps={integerAnimatedProps}
            />
          </View>
          <Text
            style={{
              color: yellowColor,
              fontSize: 38,
              fontWeight: 'bold',
            }}>
            .
          </Text>
          <AnimatedTextInput
            underlineColorAndroid="transparent"
            editable={false}
            value={decimalText.value}
            style={{
              color: yellowColor,
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: -4,
            }}
            animatedProps={decimalAnimatedProps}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default BurgerInformation;

// const styles = StyleSheet.create({});
