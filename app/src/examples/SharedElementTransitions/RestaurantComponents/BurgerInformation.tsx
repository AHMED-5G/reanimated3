/* eslint-disable react-hooks/exhaustive-deps */
import { Text, TextInput, TextInputProps, View } from 'react-native';
import React, { useEffect } from 'react';
import { BurgerInterface, width, yellowColor } from './restaurantConstants';
import Animated, {
  Easing,
  FadeInRight,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  burger: BurgerInterface;
};

const BurgerInformation = ({ burger }: Props) => {
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  const ref = React.useRef(0);
  const sv = useSharedValue(0);

  const decimalPart = burger.price.toString().split('.')[1];

  const text = useDerivedValue(() => {
    return Math.round(sv.value * Math.floor(burger.price)).toString();
  });
  const decimalText = useDerivedValue(() => {
    return Math.round(sv.value * +decimalPart).toString();
  });

  const integerAnimatedProps = useAnimatedProps(() => {
    return { text: text.value } as TextInputProps;
  });
  const decimalAnimatedProps = useAnimatedProps(() => {
    return { text: decimalText.value } as TextInputProps;
  });

  useEffect(() => {
    handleToggle();
  }, []);

  const handleToggle = () => {
    ref.current = 1 - ref.current;
    sv.value = withTiming(ref.current, {
      duration: 2000,
      easing: Easing.bezier(0.26, 0.85, 0.62, 0.94),
    });
  };

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
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
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
        </View>
      </View>
    </View>
  );
};

export default BurgerInformation;

// const styles = StyleSheet.create({});
