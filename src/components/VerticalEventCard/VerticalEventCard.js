import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './VerticalEventCard.style';
import {colors} from '../../style/colors.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const VerticalEventCard = ({data}) => {
  // console.log('datadata', data);
  return (
    <View style={styles.main__container}>
      <View>
        <Image
          source={{
            uri: data?.imageURL,
          }}
          style={styles.cardImage}
        />
        <View style={styles.eventType__container}>
          <Text style={styles.eventTypeText}>{data?.eventTag}</Text>
        </View>

        <LinearGradient
          colors={['rgba(0,0,0,0.00)', '#000']}
          style={styles.aboutEvent}>
          <Text style={styles.eventName}>{data?.name}</Text>
        </LinearGradient>
      </View>
      <View style={styles.details__container}>
        <View style={styles.TimeLocation__container}>
          <MaterialCommunityIcons name={'calendar-clock-outline'} size={20} />
          <Text numberOfLines={1} style={styles.evetTimeLocation}>
            {moment(data?.eventDate).format('MMMM DD')} |{' '}
            {moment(data?.eventDate).format('hh:mm')} onwards
          </Text>
        </View>
        <View style={styles.TimeLocation__container}>
          <SimpleLineIcons
            name={'location-pin'}
            size={20}
            color={colors.blackish}
          />
          <Text numberOfLines={1} style={styles.evetTimeLocation}>
            {data?.eventVenue}
          </Text>
        </View>
        <View style={styles.bottom__container}>
          <Text style={styles.bottomText}>
            {data?.ticketStarting === 'FREE' ? null : '₹'}
            {data?.ticketStarting}{' '}
            {data?.ticketStarting === 'FREE' ? null : 'Onwards'}
          </Text>
          <View style={styles.BuyNowLine__container}>
            <View style={styles.horizontalLine} />
            <Text style={styles.bottomText}>BUY NOW</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VerticalEventCard;
