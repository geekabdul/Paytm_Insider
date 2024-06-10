import {View, ImageBackground, Text} from 'react-native';
import React from 'react';
import styles from './MagazineCard.style';
import LinearGradient from 'react-native-linear-gradient';

const MagazineCard = ({data}) => {
  return (
    <View style={styles.main__container}>
      <ImageBackground
        source={{
          uri: data?.imageURL,
        }}
        resizeMode="contain"
        style={styles.backgroundImg}
        imageStyle={styles.imageStyle}>
        <LinearGradient
          colors={['rgba(0,0,0,0.00)', '#000']}
          style={styles.title__container}>
          <Text style={styles.title}>{data?.title}</Text>
          <Text style={styles.subTitle}>{data?.magazineTag}</Text>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default MagazineCard;
