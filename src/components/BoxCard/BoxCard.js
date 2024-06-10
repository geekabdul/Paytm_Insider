import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './BoxCard.style';

const BoxCard = ({boxData}) => {
  return (
    <View style={styles.main__container}>
      <Image source={{uri: boxData.logoURL}} style={styles.imgStyle} />

      <Text style={styles.title} numberOfLines={1}>
        {boxData.name}
      </Text>

      <Text style={styles.counts}>{boxData.eventData?.length} events</Text>
    </View>
  );
};

export default BoxCard;
