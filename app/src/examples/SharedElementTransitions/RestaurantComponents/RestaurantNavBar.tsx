import { Text, View } from 'react-native';
import React from 'react';
import { width } from './restaurantConstants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faHeart,
  faCartShopping,
  faGear,
} from '@fortawesome/free-solid-svg-icons';

const RestaurantNavBar = () => {
  const iconColor = 'white';
  const iconSize = 25;
  const listOfIcons = [
    {
      name: 'Menu',
      icon: <FontAwesomeIcon icon={faHome} color={iconColor} size={iconSize} />,
    },
    {
      name: 'Favorites',
      icon: (
        <FontAwesomeIcon icon={faHeart} color={iconColor} size={iconSize} />
      ),
    },
    {
      name: 'Cart',
      icon: (
        <FontAwesomeIcon
          icon={faCartShopping}
          color={iconColor}
          size={iconSize}
        />
      ),
    },
    {
      name: 'Settings',
      icon: <FontAwesomeIcon icon={faGear} color={iconColor} size={iconSize} />,
    },
  ];
  // const icon = <FontAwesome5 name={'comments'} />;
  return (
    <View
      style={{
        width,
        height: 60,
        backgroundColor: 'black',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {listOfIcons.map((tab, index) => (
        <View
          key={index}
          style={{
            // justifyContent: 'space-between',
            alignContent: 'space-between',
            alignItems: 'center',
          }}>
          {tab.icon}
          <Text style={{ color: 'white' }}>{tab.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default RestaurantNavBar;
