import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './EventList.style';
import BackHeader from '../../components/BackHeader/BackHeader';
import EventListCard from '../../components/EventListCard/EventListCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import SecondaryButton from '../../components/SecondaryButton/SecondaryButton';
import {colors} from '../../style/colors.style';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {getTodayDate, getTomorrowDate, getWeekendDates} from '../../libs/dates';
import Loader from '../../components/Loader/Loader';

// function formatDate(date) {
//   const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//   const day = daysOfWeek[date.getDay()];
//   const dayOfMonth = date.getDate();
//   const month = date.toLocaleString('en-US', {month: 'short'});

//   return `${day}, ${dayOfMonth} ${month}`;
// }

// function getFormattedDates() {
//   const today = new Date();
//   const tomorrow = new Date(today);
//   tomorrow.setDate(today.getDate() + 1);

//   const nextDay = new Date(tomorrow);
//   nextDay.setDate(tomorrow.getDate() + 1);

//   const todayFormatted = formatDate(today);
//   const tomorrowFormatted = formatDate(tomorrow);
//   const weekendFormatted = `${tomorrow.getDate()} ${tomorrow.toLocaleString(
//     'en-US',
//     {month: 'short'},
//   )} - ${nextDay.getDate()} ${nextDay.toLocaleString('en-US', {
//     month: 'short',
//   })}`;

//   return {todayFormatted, tomorrowFormatted, weekendFormatted};
// }

const EventListScreen = () => {
  // const formattedDates = getFormattedDates();
  const todayDate = getTodayDate();
  const tomorrowDate = getTomorrowDate();
  const weekendDate = getWeekendDates();
  const {city} = useSelector(state => state.city);
  const refRBSheet = useRef();
  const route = useRoute();
  const {data, title} = route.params;

  const [sortByFilter, setSortByFilter] = useState('price');
  const [sortFilteredData, setSortFilteredData] = useState(null);

  const handleFilterBtn = () => {
    refRBSheet.current.open();
  };

  const applyfilter = () => {
    if (sortByFilter === 'popularity') {
      const popularData = [...data].filter(item => {
        return item.popularity === true;
      });
      setSortFilteredData(popularData);
    } else if (sortByFilter === 'price') {
      const ascendingPriceData = [...data].sort((a, b) =>
        isNaN(a.ticketStarting) ? -1 : a.ticketStarting - b.ticketStarting,
      );
      setSortFilteredData(ascendingPriceData);
    } else if (sortByFilter === 'date') {
      const ascendingDateData = [...data].sort(
        (a, b) => new Date(a.eventDate) - new Date(b.eventDate),
      );
      setSortFilteredData(ascendingDateData);
    } else if (sortByFilter === 'today') {
      const targetDate = moment(todayDate).format('YYYY MM DD');
      const todayDateData = [...data].filter(item => {
        const eventDate = moment(item.eventDate).format('YYYY MM DD');
        return eventDate === targetDate;
      });
      setSortFilteredData(todayDateData);
    } else if (sortByFilter === 'tomorror') {
      const targetDate = moment(tomorrowDate).format('YYYY MM DD');
      const tomorrowDateData = [...data].filter(item => {
        const eventDate = moment(item.eventDate).format('YYYY MM DD');
        return eventDate === targetDate;
      });
      setSortFilteredData(tomorrowDateData);
    } else if (sortByFilter === 'weekend') {
      const startDate = moment(weekendDate.startDate).format('YYYY MM DD');
      const endDate = moment(weekendDate.endDate).format('YYYY MM DD');
      const weekendDateData = [...data].filter(item => {
        const eventDate = moment(item.eventDate).format('YYYY MM DD');
        return eventDate === startDate || eventDate === endDate;
      });
      setSortFilteredData(weekendDateData);
    }
  };

  useEffect(() => {
    applyfilter();
  }, [sortByFilter]);
  // console.log(sortFilteredData, 'filter data');
  return (
    <View style={styles.main__container}>
      <BackHeader headerTitle={`${title} in ${city}`} />
      {sortFilteredData?.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollView__container}>
          {sortFilteredData.map((card, index) => (
            <View key={index}>
              <EventListCard data={card} />
            </View>
          ))}
          {/* <EventListCard /> */}
        </ScrollView>
      ) : data?.length > 0 ? (
        <Loader />
      ) : (
        <View
          style={{
            // backgroundColor: 'red',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>No Event found</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.filterBtn__container}
        onPress={handleFilterBtn}
        activeOpacity={0.9}>
        <Ionicons name="filter" color={'white'} size={20} />
        <Text style={styles.filterText}>Filters</Text>
      </TouchableOpacity>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        animationType="slide"
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: '50%',
            backgroundColor: colors.tab,
          },
        }}>
        <View style={styles.filterTop__container}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.filterReset__container}
            onPress={() => {
              setSortByFilter('price');
              // setDayFilter('');
            }}>
            <Text style={styles.resetText}>RESET</Text>
          </TouchableOpacity>
          <Text style={styles.FilterText}>Filter</Text>

          <SecondaryButton
            btnText={'DONE'}
            customContainerStyles={styles.doneBtn__container}
            customBtnTextStyle={styles.doneText}
            btnHandle={() => refRBSheet.current.close()}
          />
        </View>
        <View style={styles.filterBody__container}>
          <Text style={styles.sortBy__text}>SORT BY</Text>

          <View style={styles.sortBy__container}>
            <TouchableOpacity
              style={[
                styles.sortIconTitle__container,

                sortByFilter === 'popularity'
                  ? {
                      borderWidth: 1,
                      borderColor: colors.secondary,
                    }
                  : null,
              ]}
              activeOpacity={0.9}
              onPress={() => setSortByFilter('popularity')}>
              <EvilIcons name="star" size={35} color={'black'} />
              <Text style={styles.sortByTitle__Text}>Popularity</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.sortIconTitle__container,

                sortByFilter === 'price'
                  ? {
                      borderWidth: 1,
                      borderColor: colors.secondary,
                    }
                  : null,
              ]}
              onPress={() => setSortByFilter('price')}>
              <MaterialIcons name="currency-rupee" size={30} color={'black'} />
              <Text style={styles.sortByTitle__Text}>Price</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.sortIconTitle__container,

                sortByFilter === 'date'
                  ? {
                      borderWidth: 1,
                      borderColor: colors.secondary,
                    }
                  : null,
              ]}
              onPress={() => setSortByFilter('date')}>
              <Ionicons
                name="calendar-clear-outline"
                size={30}
                color={'black'}
              />
              <Text style={styles.sortByTitle__Text}>Date</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.eventThisWeek__container}>
            <Text style={styles.ThisWeekText}>EVENTS THIS WEEK</Text>
            <View style={styles.eventThisWeek__subContainer}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  styles.day__container,
                  sortByFilter === 'today'
                    ? {
                        borderWidth: 1,
                        borderColor: colors.secondary,
                      }
                    : null,
                ]}
                onPress={() => setSortByFilter('today')}>
                <Text style={styles.todayText}>Today</Text>
                <Text style={styles.Date}>
                  {moment(todayDate).format('ddd, D MMM')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  styles.day__container,
                  sortByFilter === 'tomorror'
                    ? {
                        borderWidth: 1,
                        borderColor: colors.secondary,
                      }
                    : null,
                ]}
                onPress={() => setSortByFilter('tomorror')}>
                <Text style={styles.todayText}>Tomorrow</Text>
                <Text style={styles.Date}>
                  {moment(tomorrowDate).format('ddd, D MMM')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  styles.day__container,
                  sortByFilter === 'weekend'
                    ? {
                        borderWidth: 1,
                        borderColor: colors.secondary,
                      }
                    : null,
                ]}
                onPress={() => setSortByFilter('weekend')}>
                <Text style={styles.todayText}>Weekend</Text>
                <Text style={styles.Date}>
                  {`${moment(weekendDate.startDate).format('D')} - ${moment(
                    weekendDate.endDate,
                  ).format('D MMM')}`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export default EventListScreen;
