import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './EventListCard.style';
import Entypo from 'react-native-vector-icons/Entypo';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {APIURL} from '../../Helper';

const EventListCard = ({data}) => {
  console.log(data?.name, data?.favEventsStatus, 'like');
  const numberOfLike = data?.favEventData[0]?.like;
  const [count, setCount] = useState(numberOfLike);
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(data?.favEventsStatus);

  const handleLike = async () => {
    // setIsLiked(!isLiked);
    const authToken = await AsyncStorage.getItem('token');
    if (authToken) {
      addToFavourites();
    } else {
      navigation.navigate('LoginScreen', {
        from: 'EventListScreen',
        eventDetailsData: null,
        id: data?._id,
        fromSecond: null,
      });
    }
  };
  const handleEventCards = cardData => {
    navigation.navigate('EventDetailsScreen', {id: cardData?._id});
  };

  const addToFavourites = async () => {
    const authToken = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    };
    try {
      let response = '';
      if (isLiked) {
        response = await axios.get(
          `${APIURL}removeFavourites?_id=${data?._id}`,
          {
            headers,
          },
        );
        setIsLiked(false);
        setCount(count - 1);
        console.log(data?.name, 'unliked');
      } else {
        response = await axios.get(
          `${APIURL}addToFavourites?_id=${data?._id}`,
          {
            headers,
          },
        );
        setIsLiked(true);
        setCount(data?.favEventData?.length ? count + 1 : '1');
        console.log(data?.name, 'liked');
      }
    } catch (error) {
      console.log(error, 'addToFavourites ERROR');
    }
  };
  // useEffect(() => {
  //   if (data?.favEventsStatus) {
  //     setIsLiked(true);
  //     // setIsLiked(true);
  //   } else {
  //     setIsLiked(false);
  //   }
  // }, []);

  return (
    <View style={styles.main__container}>
      <FastImage
        source={{
          uri: data?.imageURL,
        }}
        style={styles.imageStyle}
        onTouchEnd={() => handleEventCards(data)}
      />
      <View style={styles.details__container}>
        <TouchableOpacity
          onPress={() => handleEventCards(data)}
          activeOpacity={0.9}>
          <Text style={styles.cardHeading}>{data?.name}</Text>
          <Text style={styles.cardDate}>
            {moment(data?.eventDate).format('MMMM DD YYYY')} |{' '}
            {moment(data?.eventDate).format('hh:mm')}
          </Text>
          <Text style={styles.locationText}>{data?.eventVenue}</Text>
        </TouchableOpacity>
        <View style={styles.cardFooter__container}>
          <Text style={styles.eventAmount__Text}>
            {data.ticketStarting !== 'FREE' ? '₹' : null}
            {data?.ticketStarting}
          </Text>
          <View style={styles.like__container}>
            {count > 0 ? (
              <Text style={styles.numberOflike}>{count}</Text>
            ) : null}
            <TouchableOpacity onPress={handleLike} activeOpacity={0.9}>
              {isLiked ? (
                <Entypo name="heart" size={25} color={'red'} />
              ) : (
                <Entypo name="heart-outlined" size={25} color={'black'} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EventListCard;
