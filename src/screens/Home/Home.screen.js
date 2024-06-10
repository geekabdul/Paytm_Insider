import {View, BackHandler, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './Home.style';
import Header from '../../components/Header/Header';
import PickCityModal from '../../components/PickCityModal/PickCityModal';
import {ImageSlider} from '@pembajak/react-native-image-slider-banner';
import EventCategoryHeading from '../../components/EventCategoryHeading/EventCategoryHeading';
import HorizontalEventCard from '../../components/HorizontalEventCard/HorizontalEventCard';
import EventCategoryCard from '../../components/EventCategoryCard/EventCategoryCard';
import VerticalEventCard from '../../components/VerticalEventCard/VerticalEventCard';
import axios from 'axios';
import BoxCard from '../../components/BoxCard/BoxCard';
import MagazineCard from '../../components/MagazineCard/MagazineCard';
import FollowCard from '../../components/FollowCard/FollowCard';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APIURL} from '../../Helper';
import RecentlyViewCard from '../../components/RecentlyViewCard/RecentlyViewCard';
import {useSelector} from 'react-redux';
import ThisWeekBox from '../../components/ThisWeekBox/ThisWeekBox';
import moment from 'moment';
import {getTodayDate, getTomorrowDate, getWeekendDates} from '../../libs/dates';

const HomeScreen = () => {
  const todayDate = getTodayDate();
  const tomorrowData = getTomorrowDate();
  const weekendDate = getWeekendDates();

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const city = useSelector(state => state.city.city);
  const [modalVisible, setModalVisible] = useState(false);

  const [recentEvents, setRecentEvents] = useState([]);
  const [bannerData, setBannerData] = useState(null);
  const [trendingEventsData, setTrendingEventsData] = useState(null);
  const [eventCategoryData, setEventCategoryData] = useState(null);
  const [sortedEventCategoryData, setSortedEventCategoryData] = useState(null);
  const [featuredEventsData, setFeaturedEventsData] = useState(null);
  const [todayEvent, setTodayEvent] = useState(null);
  const [tomorrowEvent, setTomorrowEvent] = useState(null);
  const [weekendEvent, setWeekendEvent] = useState(null);
  const [magazineData, setMagazineData] = useState(null);
  const [artistsData, setArtistsData] = useState(null);
  const [venuesData, setVenuesData] = useState(null);

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        const storedRecentEvents = await AsyncStorage.getItem(
          'recentViewedEvents',
        );
        if (storedRecentEvents) {
          const parsedRecentEvents = JSON.parse(storedRecentEvents);
          setRecentEvents(parsedRecentEvents);
        }
      } catch (error) {
        console.error('Error fetching recent events:', error);
      }
    };

    if (isFocused) {
      fetchRecentEvents();
    }
  }, [isFocused]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        BackHandler.exitApp();
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  // button handles

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleBanner = data => {
    navigation.navigate('EventDetailsScreen', {id: data?._id});
  };
  const handleEventCards = data => {
    navigation.navigate('EventDetailsScreen', {id: data?._id});
  };

  const handleViewBtn = (data, title) => {
    navigation.navigate('EventListScreen', {data, title});
  };
  const handleBrowseEvents = data => {
    navigation.navigate('BrowseEventsScreen', {data});
  };

  const handleMagazineCard = data => {
    navigation.navigate('MagazineScreen', {id: data._id});
  };

  const handleArtistCard = data => {
    navigation.navigate('ArtistsVenueScreen', {id: data._id, from: 'artist'});
  };

  const handleVenueCard = data => {
    navigation.navigate('ArtistsVenueScreen', {id: data._id, from: 'venue'});
  };

  const handleArtistVenueViewBtn = (data, from) => {
    navigation.navigate('ArtistVenueListScreen', {data, from});
  };

  // apis call

  const getbannerData = async () => {
    const locationId = await AsyncStorage.getItem('locationId');
    try {
      const response = await axios.get(
        `${APIURL}getbannerData?locationId=${locationId}`,
        // `${APIURL}getbannerData?locationId=65029c9e84b4b4a660ba1c42`,
      );
      // console.log(response?.data?.data, 'getbannerData RESPONSE');
      setBannerData(response?.data?.data);
    } catch (error) {
      setBannerData(null);
      console.log(error, 'getbannerData ERROR');
    }
  };

  const getTrendingEvents = async () => {
    try {
      const authToken = await AsyncStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };
      let response = '';
      if (authToken) {
        response = await axios.get(`${APIURL}getTrendingEvents`, {
          headers,
        });
      } else {
        response = await axios.get(`${APIURL}getTrendingEvents`);
      }
      // console.log(response?.data?.data?.length, 'getTrendingEvents RESPONSE');
      setTrendingEventsData(response?.data?.data);
    } catch (error) {
      setEventCategoryData(null);
      console.log(error, 'getTrendingEvents ERROR');
    }
  };

  const getEventCategory = async () => {
    const locationId = await AsyncStorage.getItem('locationId');
    try {
      const authToken = await AsyncStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };
      let response = '';
      if (authToken) {
        response = await axios.get(
          `${APIURL}getEventCategory?locationId=${locationId}`,
          {
            headers,
          },
        );
      } else {
        response = await axios.get(
          `${APIURL}getEventCategory?locationId=${locationId}`,
        );
      }
      // console.log(response?.data?.data, 'getEventCategory RESPONSE');
      setEventCategoryData(response?.data?.data);
      sortEventCategoryData(response?.data?.data);
    } catch (error) {
      setEventCategoryData(null);
      console.log(error.message, 'getEventCategory ERROR');
    }
  };

  const getFeaturedEvents = async () => {
    try {
      const response = await axios.get(`${APIURL}getFeaturedEvents`);
      // console.log(response?.data?.data.length, 'getFeaturedEvents RESPONSE');
      setFeaturedEventsData(response?.data?.data);
    } catch (error) {
      setFeaturedEventsData(null);
      console.log(error, 'getFeaturedEvents ERROR');
    }
  };

  const getTodayEvents = async () => {
    const TodayDate = moment(todayDate).format('YYYY-MM-DD');
    // console.log(TodayDate, 'today DDDDDDDD');
    // const todayDate = moment(currentDate).format('YYYY-MM-DD');

    try {
      const response = await axios.get(
        `${APIURL}getEventByDate?startDate=${TodayDate}&endDate=${TodayDate}`,
      );
      // console.log(response?.data?.data, 'getToday Response');
      setTodayEvent(response?.data?.data);
    } catch (error) {
      console.log(error.message, 'getToday Error');
    }
  };

  const getTomorrowEvents = async () => {
    // const TodayDate = moment(todayDate).format('YYYY-MM-DD');
    const TomorrowDate = moment(tomorrowData).format('YYYY-MM-DD');
    // console.log(TodayDate, TomorrowDate, ' tomorrow DDDDDDDD');

    try {
      const response = await axios.get(
        `${APIURL}getEventByDate?startDate=${TomorrowDate}&endDate=${TomorrowDate}`,
      );
      // console.log(response?.data?.data, 'tomorrow Response');
      setTomorrowEvent(response?.data?.data);
    } catch (error) {
      console.log(error.message, 'tomorrow Error');
    }
  };

  const getWeekendEvents = async () => {
    const startDate = moment(weekendDate.startDate).format('YYYY-MM-DD');
    const endDate = moment(weekendDate.endDate).format('YYYY-MM-DD');

    try {
      const response = await axios.get(
        `${APIURL}getEventByDate?startDate=${startDate}&endDate=${endDate}`,
      );
      // console.log(response?.data?.data, 'weekend Response');
      setWeekendEvent(response?.data?.data);
    } catch (error) {
      console.log(error.message, 'weekend Error');
    }
  };

  const getMagazine = async () => {
    try {
      const response = await axios.get(`${APIURL}getMagazine`);
      // console.log(response?.data?.data.length, 'getMagazine RESPONSE');
      setMagazineData(response?.data?.data);
    } catch (error) {
      setMagazineData(null);
      console.log(error, 'getMagazine ERROR');
    }
  };

  const getArtists = async () => {
    try {
      const authToken = await AsyncStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };
      let response = '';
      if (authToken) {
        response = await axios.get(`${APIURL}getArtists`, {
          headers,
        });
      } else {
        response = await axios.get(`${APIURL}getArtists`);
      }
      // console.log(response?.data?.data.length, 'getArtists RESPONSE');
      setArtistsData(response?.data?.data);
    } catch (error) {
      setArtistsData(null);
      console.log(error, 'getArtists ERROR');
    }
  };

  const getVenue = async () => {
    const locationId = await AsyncStorage.getItem('locationId');
    try {
      const authToken = await AsyncStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };
      let response = '';
      if (authToken) {
        response = await axios.get(
          `${APIURL}getVenue?locationId=${locationId}`,
          {
            headers,
          },
        );
      } else {
        response = await axios.get(
          `${APIURL}getVenue?locationId=${locationId}`,
        );
      }
      // console.log(response?.data?.data.length, 'getVenue RESPONSE');
      setVenuesData(response?.data?.data);
    } catch (error) {
      setVenuesData(null);
      console.log(error?.response?.data, 'getVenue ERROR');
    }
  };

  const modifiedEventData = bannerData?.map(({imageURL, ...rest}) => ({
    ...rest,
    img: imageURL,
  }));

  const sortEventCategoryData = dataEvent => {
    const dataCopy = [...dataEvent];
    dataCopy.sort((a, b) => b.eventData.length - a.eventData.length);
    setSortedEventCategoryData(dataCopy);
  };

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getTrendingEvents();
      getEventCategory();
      getArtists();
      getVenue();
    });
    return focusHandler;
  }, [navigation]);

  useEffect(() => {
    getbannerData();
    getTrendingEvents();
    getEventCategory();
    getFeaturedEvents();
    getTodayEvents();
    getTomorrowEvents();
    getWeekendEvents();
    getMagazine();
    getArtists();
    getVenue();
  }, [city]);

  return (
    <ScrollView>
      <View style={styles.main__container}>
        <Header from="Home" handleClick={handleShowModal} />
        {bannerData?.length ? (
          <View style={styles.BannerParent__container}>
            <ImageSlider
              data={modifiedEventData}
              preview={false}
              caroselImageContainerStyle={styles.caroselImageContainerStyle}
              autoPlay={true}
              caroselImageStyle={styles.caroselImageStyle}
              inActiveIndicatorStyle={styles.inActiveIndicatorStyle}
              activeIndicatorStyle={styles.activeIndicatorStyle}
              indicatorContainerStyle={styles.indicatorContainerStyle}
              onClick={itemData => handleBanner(itemData)}
            />
          </View>
        ) : null}

        <View style={styles.body__container}>
          {recentEvents.length ? (
            <>
              <EventCategoryHeading
                heading={'RECENTLY VIEWED'}
                subHeading={'Pick up where you left off'}
                viewAll={false}
                headingLogo={require('../../images/recently.png')}
              />
              <ScrollView
                contentContainerStyle={styles.eventCards__container}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {recentEvents?.map((recentEvent, index) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => handleEventCards(recentEvent)}
                    key={index}>
                    <RecentlyViewCard data={recentEvent} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : null}
          {trendingEventsData?.length ? (
            <>
              <EventCategoryHeading
                heading={'TRENDING EVENTS'}
                subHeading={'The most exciting events happening around you'}
                viewAll={true}
                headingLogo={require('../../images/trending.png')}
                handleViewBtn={() =>
                  handleViewBtn(trendingEventsData, 'All step out events')
                }
              />
              <ScrollView
                contentContainerStyle={styles.eventCards__container}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {trendingEventsData?.map((trendingEvent, index) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => handleEventCards(trendingEvent)}
                    key={index}>
                    <HorizontalEventCard data={trendingEvent} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : null}

          {eventCategoryData?.length ? (
            <>
              <EventCategoryHeading
                heading={'FIND NEW EXPERIENCES'}
                subHeading={'Explore. Discover. Make a Plan'}
                viewAll={false}
                headingLogo={require('../../images/mapRoute.png')}
              />
              <View
                style={styles.eventCategoryCards__container}
                // onTouchEnd={handleEventList}
              >
                {eventCategoryData?.map((eventCategory, index) =>
                  index < 6 ? (
                    eventCategory?.eventData.length > 0 ? (
                      <TouchableOpacity
                        onPress={() =>
                          handleViewBtn(
                            eventCategory?.eventData,
                            eventCategory?.name,
                          )
                        }
                        key={index}>
                        <EventCategoryCard key={index} data={eventCategory} />
                      </TouchableOpacity>
                    ) : null
                  ) : null,
                )}
              </View>
            </>
          ) : null}

          {featuredEventsData?.length ? (
            <>
              <EventCategoryHeading
                heading={'FEATURED EVENTS'}
                viewAll={false}
                headingLogo={require('../../images/crown.png')}
              />
              <ScrollView
                contentContainerStyle={styles.eventCards__container}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {featuredEventsData?.map((featuredData, index) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => handleEventCards(featuredData)}
                    key={index}>
                    <VerticalEventCard data={featuredData} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : null}

          {eventCategoryData?.length ? (
            <>
              <EventCategoryHeading
                heading={'BROWSE EVENTS BY GENRE'}
                viewAll={true}
                headingLogo={require('../../images/fourSquare.png')}
                handleViewBtn={() => handleBrowseEvents(eventCategoryData)}
              />
              <ScrollView
                style={styles.boxCards__container}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {sortedEventCategoryData?.map((genre, index) =>
                  genre?.eventData.length > 0 ? (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() =>
                        handleViewBtn(genre?.eventData, genre?.name)
                      }
                      key={index}>
                      <BoxCard boxData={genre} key={index} />
                    </TouchableOpacity>
                  ) : null,
                )}
              </ScrollView>
            </>
          ) : null}

          {eventCategoryData
            ? eventCategoryData?.map((eventCategory, index) =>
                index < 8 ? (
                  eventCategory?.eventData.length > 0 ? (
                    <View key={index}>
                      <EventCategoryHeading
                        from={'eventCategory'}
                        headingLogo={eventCategory.logoURL}
                        heading={eventCategory?.name.toUpperCase()}
                        viewAll={true}
                        handleViewBtn={() =>
                          handleViewBtn(
                            eventCategory?.eventData,
                            eventCategory?.name,
                          )
                        }
                      />
                      <ScrollView
                        contentContainerStyle={styles.eventCards__container}
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {eventCategory?.eventData?.map((categoryEvent, ind) => (
                          <TouchableOpacity
                            onPress={() => handleEventCards(categoryEvent)}
                            key={ind}>
                            <HorizontalEventCard data={categoryEvent} />
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  ) : null
                ) : null,
              )
            : null}

          <EventCategoryHeading
            heading={'EVENTS THIS WEEK'}
            viewAll={false}
            headingLogo={require('../../images/calendar.png')}
          />

          <ScrollView
            style={styles.boxCards__container}
            horizontal
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              onPress={() => handleViewBtn(todayEvent, 'Today')}>
              <ThisWeekBox
                day={'Today'}
                date={moment(todayDate).format('ddd, D MMM')}
                eventCount={todayEvent?.length}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleViewBtn(tomorrowEvent, 'Tomorrow')}>
              <ThisWeekBox
                day={'Tomorrow'}
                date={moment(tomorrowData).format('ddd, D MMM')}
                eventCount={tomorrowEvent?.length}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleViewBtn(weekendEvent, 'Weekend')}>
              <ThisWeekBox
                day={'Weekend'}
                date={`${moment(weekendDate.startDate).format('D')} - ${moment(
                  weekendDate.endDate,
                ).format('D MMM')}`}
                eventCount={weekendEvent?.length}
              />
            </TouchableOpacity>
          </ScrollView>

          {magazineData?.length ? (
            <>
              <EventCategoryHeading
                heading={'MAGAZINE'}
                viewAll={false}
                headingLogo={require('../../images/magazine.png')}
              />
              <ScrollView
                contentContainerStyle={styles.eventCards__container}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {magazineData?.map((magazine, index) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => handleMagazineCard(magazine)}
                    key={index}>
                    <MagazineCard data={magazine} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : null}

          {artistsData?.length ? (
            <>
              <EventCategoryHeading
                heading={'ARTISTS'}
                viewAll={true}
                handleViewBtn={() =>
                  handleArtistVenueViewBtn(artistsData, 'artist')
                }
                headingLogo={require('../../images/artists.png')}
              />
              <ScrollView
                contentContainerStyle={styles.eventCards__container}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {artistsData?.map((artist, index) => (
                  <TouchableOpacity
                    onPress={() => handleArtistCard(artist)}
                    key={index}
                    activeOpacity={0.9}>
                    <FollowCard data={artist} from={'artist'} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : null}

          {venuesData?.length ? (
            <>
              <EventCategoryHeading
                heading={'VENUES'}
                viewAll={true}
                handleViewBtn={() =>
                  handleArtistVenueViewBtn(venuesData, 'venue')
                }
                headingLogo={require('../../images/map.png')}
              />
              <ScrollView
                contentContainerStyle={styles.eventCards__container}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {venuesData?.map((venue, index) => (
                  <TouchableOpacity
                    onPress={() => handleVenueCard(venue)}
                    key={index}
                    activeOpacity={0.9}>
                    <FollowCard data={venue} key={index} from={'venue'} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : null}
        </View>

        <PickCityModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          from={false}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
