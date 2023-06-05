import { Image, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { width } from './restaurantConstants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

type Props = { navigation: any };

const SecondScreenHeader = ({ navigation }: Props) => {
  return (
    <View
      style={{
        // position: 'absolute',
        // top: 20,
        // left: 20,
        marginTop: 20,
        width: width * 0.9,
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          width: 30,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          borderRadius: 40,
        }}
        onPress={() => navigation.goBack()}>
        <Image
          source={{
            uri: 'https://cdn.iconscout.com/icon/free/png-256/free-back-arrow-1767523-1502427.png',
          }}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
      <View>
        <FontAwesomeIcon icon={faHeart} color={'white'} size={25} />
      </View>
    </View>
  );
};

export default SecondScreenHeader;

// const styles = StyleSheet.create({});
