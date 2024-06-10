import {View, Image} from 'react-native';
import React from 'react';
import styles from './EventCategoryCard.style';

const EventCategoryCard = ({data}) => {
  return (
    <View style={styles.main__container}>
      <Image
        source={{
          uri: data.imageURL,
        }}
        style={styles.imgStyle}
      />
    </View>
  );
};

export default EventCategoryCard;
