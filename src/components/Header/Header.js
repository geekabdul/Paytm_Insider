import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './Header.style';
import {useSelector} from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {colors} from '../../style/colors.style';

const Header = ({from, handleClick}) => {
  const city = useSelector(state => state.city.city);

  return (
    <View style={styles.main__container}>
      <View style={styles.content__container}>
        <Image
          source={require('../../images/Insider_Logo_Colour_rrag9p.png')}
          style={styles.logoStyle}
          resizeMode="contain"
        />
        {from === 'Home' ? (
          <TouchableOpacity
          activeOpacity={0.9}
            style={styles.location__container}
            onPress={handleClick}>
            <SimpleLineIcons
              name="location-pin"
              // size={15}
              color={colors.primary}
            />
            <Text style={styles.cityName}>{city}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default Header;
