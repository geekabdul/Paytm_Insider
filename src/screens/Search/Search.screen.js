import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Search.style';
import Header from '../../components/Header/Header';
import {colors} from '../../style/colors.style';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import InputField from '../../components/InputField/InputField';
import axios from 'axios';
import {APIURL} from '../../Helper';
import {useNavigation} from '@react-navigation/native';
import SearchMagazineCard from '../../components/SearchMagazineCard/SearchMagazineCard';
import SearchArtistVenueListCard from '../../components/SearchArtistVenueListCard/SearchArtistVenueListCard';
import SearchEventCard from '../../components/SearchEventCard/SearchEventCard';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [showTrending, setShowTrending] = useState(true);
  const [trendingEventsData, setTrendingEventsData] = useState(null);
  const [searchData, setSearchData] = useState(null);

  //api Call
  const getSearchData = async () => {
    try {
      const response = await axios.get(`${APIURL}searchData?search=${search}`);
      console.log(response?.data?.data, 'getSearchData RESPONSE');
      setSearchData(response?.data?.data);
    } catch (error) {
      console.log(error.message, 'getSearchData ERROR');
    }
  };
  const getTrendingEvents = async () => {
    try {
      const response = await axios.get(`${APIURL}getTrendingEvents`);
      // console.log(response?.data?.data?.length, 'getTrendingEvents RESPONSE');
      setTrendingEventsData(response?.data?.data);
    } catch (error) {
      console.log(error, 'getTrendingEvents ERROR');
    }
  };

  //handling
  const handleSearchChange = data => {
    if (data.length > 0) {
      setShowTrending(false);
      console.log('dont show trending');
      getSearchData();
    } else {
      setShowTrending(true);
      console.log('show trending');
    }
    setSearch(data);
  };

  const trendingListHandle = data => {
    navigation.navigate('EventDetailsScreen', {id: data?._id});
  };

  const handleMagazineCard = data => {
    navigation.navigate('MagazineScreen', {id: data._id});
  };

  const handleEventCard = data => {
    // console.log('search check ', data);
    navigation.navigate('EventDetailsScreen', {id: data?._id});
  };

  useEffect(() => {
    getTrendingEvents();
  }, []);
  return (
    <>
      <Header />
      <ScrollView style={styles.main__container}>
        <View style={styles.searchBox__container}>
          <Fontisto name="search" color={colors.black} size={20} />
          <InputField
            value={search}
            onChangeValue={handleSearchChange}
            placeholder={'Find events, artists and more..'}
            inputCustomStyle={styles.inputStyle}
            autoFocus={true}
          />
        </View>
        <View style={styles.body_container}>
          {showTrending ? (
            <>
              <View style={styles.trendingHeadin__container}>
                <Text style={styles.textTrending}>Trending</Text>
                <View style={styles.trendingIcon__container}>
                  <FontAwesome6
                    name="arrow-trend-up"
                    color={'white'}
                    size={10}
                  />
                </View>
              </View>

              <View style={styles.lists__container}>
                {trendingEventsData?.map((list, index) => (
                  <TouchableOpacity
                    style={styles.list}
                    key={index}
                    activeOpacity={0.9}
                    onPress={() => trendingListHandle(list)}>
                    <Text style={styles.listText}>{list.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          ) : (
            <View style={styles.resultData__container}>
              <ScrollView
                contentContainerStyle={styles.eventCards__container}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {searchData?.dataMagazine?.map((magazine, index) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => handleMagazineCard(magazine)}
                    key={index}>
                    <SearchMagazineCard
                      data={magazine}
                      customContainerStyle={styles.magazineCard}
                      customImageStyle={styles.magazineImage}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View style={styles.artistList__container}>
                {searchData?.dataArtist?.map(
                  (cardItem, index) => (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() =>
                        navigation.navigate('ArtistsVenueScreen', {
                          id: cardItem?._id,
                          from: 'artist',
                        })
                      }
                      key={index}>
                      <SearchArtistVenueListCard
                        data={cardItem}
                        from={'artist'}
                      />
                    </TouchableOpacity>
                  ),
                  // console.log(cardItem.fullName, search),
                )}
              </View>

              <View style={styles.eventList__container}>
                {searchData?.dataEvent?.map((favEvent, index) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => handleEventCard(favEvent)}
                    key={index}>
                    <SearchEventCard data={favEvent} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default SearchScreen;
