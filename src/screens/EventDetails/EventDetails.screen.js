import {
  View,
  Text,
  ScrollView,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './EventDetails.style';
import BackHeader from '../../components/BackHeader/BackHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../style/colors.style';
import HorizontalLine from '../../components/HorizontalLine/HorizontalLine';
import HorizontalEventCard from '../../components/HorizontalEventCard/HorizontalEventCard';
import {useNavigation, useRoute} from '@react-navigation/native';
import SecondaryButton from '../../components/SecondaryButton/SecondaryButton';
import axios from 'axios';
import moment from 'moment';
import HTML from 'react-native-render-html';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader/Loader';
import {APIURL, RAZORPAY_KEY_ID} from '../../Helper';
import RazorpayCheckout from 'react-native-razorpay';
import YoutubePlayer from 'react-native-youtube-iframe';

const EventDetailsScreen = () => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params;
  const [isLiked, setIsLiked] = useState(false);
  const [isShowTerms, setIsShowTerms] = useState(false);
  const [eventDetailsData, setEventDetailsData] = useState(null);

  let videoId = '';
  const videoIdMatch = eventDetailsData?.videoUrl.match(/v=([^&]+)/);

  if (videoIdMatch && videoIdMatch[1]) {
    videoId = videoIdMatch[1];
    // console.log(videoId, 'videoIdddddddd'); // This will log '8-E1LbChJ88'
  } else {
    console.log('Video ID not found');
  }
  const handleLike = async () => {
    const authToken = await AsyncStorage.getItem('token');
    if (authToken) {
      addToFavourites();
    } else {
      navigation.navigate('LoginScreen', {
        from: 'EventDetailsScreen',
        eventDetailsData: null,
        id: id,
        fromSecond: null,
      });
    }
  };

  const handleShowTermsConditions = () => {
    setIsShowTerms(!isShowTerms);
  };
  const handleEventCards = data => {
    navigation.push('EventDetailsScreen', {id: data?._id});
  };
  //api calling

  const getEventDetails = async () => {
    try {
      const authToken = await AsyncStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };
      let response = '';
      if (authToken) {
        response = await axios.get(`${APIURL}getEventDetails?_id=${id}`, {
          headers,
        });
      } else {
        response = await axios.get(`${APIURL}getEventDetails?_id=${id}`);
      }

      console.log(
        response?.data?.data[0]?.favEventsStatus,
        'getEventDetails RESPONSE',
      );
      if (response?.data?.data[0]?.favEventsStatus) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
      saveRecentViewedEvent(response?.data?.data[0]);
      setEventDetailsData(response?.data?.data[0]);
    } catch (error) {
      console.log(error?.response?.data?.message, 'getEventDetails ERROR');
    }
  };

  const saveRecentViewedEvent = async event => {
    try {
      const existingRecentEvents = await AsyncStorage.getItem(
        'recentViewedEvents',
      );
      let recentEvents = existingRecentEvents
        ? JSON.parse(existingRecentEvents)
        : [];
      const existingEventIndex = recentEvents.findIndex(
        item => item._id === event._id,
      );
      if (existingEventIndex !== -1) {
        recentEvents.splice(existingEventIndex, 1);
      }
      recentEvents.unshift(event);
      // console.log('recentEventsrecentEventsrecentEvents', recentEvents);
      await AsyncStorage.setItem(
        'recentViewedEvents',
        JSON.stringify(recentEvents),
      );
    } catch (error) {
      console.error('Error saving recent event:', error);
    }
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
        response = await axios.get(`${APIURL}removeFavourites?_id=${id}`, {
          headers,
        });
        setIsLiked(false);
      } else {
        response = await axios.get(`${APIURL}addToFavourites?_id=${id}`, {
          headers,
        });
        setIsLiked(true);
      }
    } catch (error) {
      console.log(error, 'addToFavourites ERROR');
    }
  };

  useEffect(() => {
    getEventDetails();
  }, []);

  const BuyOnlineFunc = async razorpay => {
    try {
      const authToken = await AsyncStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };
      const params = {
        eventId: eventDetailsData?._id,
      };

      console.log(
        'eventDetailsData?._ideventDetailsData?._id',
        eventDetailsData?._id,
      );
      const response = await axios.post(`${APIURL}buyTicketsOnline`, params, {
        headers,
      });

      console.log(
        response?.data?.data,
        'buyTicketsOnlinebuyTicketsOnlinebuyTicketsOnline',
      );
      if (response?.data?.status && razorpay) {
        OpenRazorpaysdk(response?.data?.data?.orderId);
      } else {
        Alert.alert('Order SuccessFull! Please check Your Orders');
      }
    } catch (error) {
      console.log(error, 'buyTicketsbuyTicketsbuyTicketsRROR');
    }
  };
  const OpenRazorpaysdk = async id => {
    console.log('ididididididid1234567777777777777777777777', id);
    let Details = await AsyncStorage.getItem('UserDetail');
    let parsedetails = JSON.parse(Details);
    console.log(
      'parsedetailsparsedetailsparsedetailsparsedetails',
      parsedetails,
    );
    try {
      var options = {
        description: 'Paytm insider',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: RAZORPAY_KEY_ID, // Your api key
        amount: eventDetailsData?.ticketStarting * 100,
        order_id: id,
        name: 'Paytm insider',
        prefill: {
          email: parsedetails?.emailId,
          contact: parsedetails?.mobileNumber,
          name: parsedetails?.firstName,
        },
        theme: {color: '#2196F3'},
      };
      RazorpayCheckout.open(options)
        .then(data => {
          console.log('data', `Success: ${data.razorpay_payment_id}`);
          // handle success
          navigation.goBack();
        })
        .catch(error => {
          // handle failure
          console.log(
            'razorpayyyyy error',
            `Error: ${error.code} | ${error.description}`,
          );
        });
    } catch (error) {
      console.log('razorpayyyyy error', error);
    }
  };
  return (
    // <View style={styles.main__container}>
    eventDetailsData !== null ? (
      <>
        <BackHeader headerTitle={eventDetailsData?.name} />
        <ScrollView style={styles.main__container}>
          <Image
            source={{
              uri: eventDetailsData?.imageURL,
            }}
            style={styles.eventImage}
          />
          <View style={styles.body__container}>
            <View style={styles.aboutHeading__container}>
              <Text style={styles.aboutText}>About</Text>
            </View>

            <View style={styles.eventDetails__container}>
              <View style={styles.eventNameIcon__container}>
                <Text style={styles.eventName}>{eventDetailsData?.name}</Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.heartIcon__container}
                  onPress={handleLike}>
                  {isLiked ? (
                    <Entypo name="heart" size={25} color={'red'} />
                  ) : (
                    <Entypo name="heart-outlined" size={25} color={'black'} />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.eventDetails__subContainer}>
                <View style={styles.subDetails__container}>
                  <Feather name={'bookmark'} size={18} color={'black'} />
                  <Text style={styles.subDetail}>
                    {eventDetailsData?.eventTag}
                  </Text>
                </View>
                <View style={styles.subDetails__container}>
                  <Feather name={'calendar'} size={18} color={'black'} />
                  <Text style={styles.subDetail}>
                    {moment(eventDetailsData?.eventDate).format('MMMM DD')} |{' '}
                    {moment(eventDetailsData?.eventDate).format('hh:mm')}{' '}
                    onwards
                  </Text>
                </View>
                <View style={styles.subDetails__container}>
                  <Ionicons
                    name={'location-outline'}
                    size={18}
                    color={'black'}
                  />
                  <Text style={styles.subDetail}>
                    {eventDetailsData?.eventVenue} |{' '}
                    {eventDetailsData?.cityName}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.eventGuide__container}>
              <Text style={styles.eventGuide__heading}>Event Guide</Text>
              <View style={styles.eventGuid__subContainer}>
                <View style={styles.ageIcon__container}>
                  <Text style={styles.ageIconText}>
                    {eventDetailsData?.ageLimit}
                  </Text>
                  <Text style={styles.agePlusIcon}>+</Text>
                </View>
                {/* <Image
                  source={require('../../images/18PlusIcon.png')}
                  style={styles.eventguideImg}
                /> */}
                <View style={styles.eventGuid__subRightContainer}>
                  <Text> For Age(s)</Text>
                  <Text style={styles.eventGuide__subText}>
                    {eventDetailsData?.ageLimit}
                  </Text>
                </View>
              </View>
              <View style={styles.eventGuid__subContainer}>
                <Image
                  source={require('../../images/translate.png')}
                  style={styles.eventguideImg}
                />
                <View style={styles.eventGuid__subRightContainer}>
                  <Text>Language</Text>
                  <Text style={styles.eventGuide__subText}>
                    {eventDetailsData?.language}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.inviteParent__container}>
              <View style={styles.inviteShare__container}>
                <Text style={styles.inviteFriend__text}>
                  Invite your friends
                </Text>
                <View style={styles.share__container}>
                  <Text style={styles.shareText}>SHARE</Text>
                </View>
              </View>
              <Text style={styles.shareSubText}>
                and enjoy a shared experience
              </Text>
            </View>
            {eventDetailsData?.aboutEvent ? (
              <View style={styles.aboutEvent__container}>
                <Text style={styles.aboutEvent__text}>About the Event</Text>

                <HTML
                  source={{html: eventDetailsData?.aboutEvent}}
                  contentWidth={width}
                />
              </View>
            ) : null}
            {eventDetailsData?.videoUrl ? (
              <View style={styles.video__container}>
                <Text style={styles.aboutEvent__text}>Video</Text>
                <YoutubePlayer
                  webViewStyle={{opacity: 0.99}}
                  height={220}
                  mute={true}
                  loop={true}
                  play={false}
                  videoId={videoId}
                  controls={false}
                />
              </View>
            ) : null}

            {eventDetailsData?.instruction ? (
              <View style={styles.termsCondition__container}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.termsCondition__subContainer}
                  onPress={handleShowTermsConditions}>
                  {!isShowTerms ? (
                    <FontAwesome
                      name="plus"
                      color={colors.secondary}
                      size={15}
                    />
                  ) : (
                    <FontAwesome
                      name="minus"
                      color={colors.secondary}
                      size={15}
                    />
                  )}
                  <Text style={styles.termsCondition__text}>
                    Terms & Conditions
                  </Text>
                </TouchableOpacity>
                {isShowTerms ? (
                  <View style={styles.termsCondition__decscription}>
                    <HTML
                      source={{html: eventDetailsData?.instruction}}
                      contentWidth={width}
                    />
                  </View>
                ) : null}
              </View>
            ) : null}
            <HorizontalLine />
          </View>
          {eventDetailsData?.similarData.length ? (
            <View style={styles.recommended__container}>
              <Text style={styles.recommended__heading}>
                YOU MAY LOVE THESE TOO...
              </Text>
              <ScrollView
                contentContainerStyle={styles.eventCards__container}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {eventDetailsData?.similarData?.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => handleEventCards(item)}
                    key={index}
                    activeOpacity={0.9}>
                    <HorizontalEventCard data={item} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ) : null}
        </ScrollView>

        <View style={styles.footer__container}>
          <View style={styles.footer__leftSubContainer}>
            <Ionicons name="wallet-outline" size={20} color={'black'} />
            <Text style={styles.footerText}>
              {eventDetailsData?.ticketStarting === 'FREE'
                ? 'FREE'
                : `₹${eventDetailsData?.ticketStarting}`}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.footer__rightSubContainer}
            onPress={() => {
              if (eventDetailsData?.cityName != 'Online') {
                if (eventDetailsData?.ticketStarting !== 'FREE') {
                  console.log('offline paid');
                  navigation.navigate('BuyNowScreen', {
                    eventDetailsData,
                    Razorpay: true,
                  });
                } else {
                  console.log('offline free');
                  navigation.navigate('BuyNowScreen', {
                    eventDetailsData,
                    Razorpay: false,
                  });
                }
              } else {
                if (eventDetailsData?.ticketStarting !== 'FREE') {
                  console.log('online paid');
                  BuyOnlineFunc(true);
                } else {
                  console.log('online free');
                  BuyOnlineFunc(false);
                }
              }
            }}>
            <SecondaryButton btnText={'BUY NOW'} />
          </TouchableOpacity>
        </View>
      </>
    ) : (
      <Loader />
    )
    // </View>
  );
};

export default EventDetailsScreen;
