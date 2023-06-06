import { Dimensions } from 'react-native';
import { Easing, SharedTransition, withTiming } from 'react-native-reanimated';
export const yellowColor = '#ffcc00';
export const priceBackgroundColor = '#86a659';
export const { height, width } = Dimensions.get('screen');

// const springOptions = {
//   damping: 15,
// };
const timingOptions = {
  // duration: 500,
  easing: Easing.bezier(0.54, 0.41, 0.69, 1),
};

export const restaurantTransition = SharedTransition.custom((values) => {
  'worklet';
  return {
    width: withTiming(values.targetWidth, timingOptions),
    height: withTiming(values.targetHeight, timingOptions),
    originX: withTiming(values.targetOriginX, timingOptions),
    originY: withTiming(values.targetOriginY, timingOptions),
  };
});

export type BurgerInterface = {
  id: string;
  name: string;
  price: number;
  image: string;
  weight?: number;
};

export const easiBezi = Easing.bezier(0.26, 0.85, 0.62, 0.94);
export const easiBeziCounter = Easing.bezier(0.26, 0.85, 0.62, 0.94);
export const easiBeziCircular = Easing.inOut(Easing.poly(4));
