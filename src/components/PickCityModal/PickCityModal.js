import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './PickCityModal.style';
import {colors} from '../../style/colors.style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {requestLocationPermission} from '../../libs/requestLocationPermission';
import {useSelector, useDispatch} from 'react-redux';
import {setCity} from '../../ReduxToolkit/slices/citySlice';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {APIURL} from '../../Helper';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {CommonActions} from '@react-navigation/native';
const PickCityModal = ({modalVisible, setModalVisible,from}) => {
  const [searchCity, setsearchCity] = useState('');
  const [searchList, setsearchList] = useState([]);
  const [locationList, setlocationList] = useState([]);
  const API_KEY = 'AIzaSyDMLeWZW0BxtJfflLb2a8Qj1VVUJaaP5jI';

  // console.log('locationList', locationList);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const city = useSelector(state => state.city.city);

  const getfun = async () => {
    await requestLocationPermission();
  };
  useEffect(() => {
    // Add a check to avoid making an API request if the search text is empty
    if (searchCity) {
      searchlocationFunc();
    } else {
      setsearchList([]);
    }
  }, [searchCity]);
  useEffect(() => {
    getLocationList();
  }, []);
  const getLocationList = async () => {
    try {
      const response = await axios.get(`${APIURL}/getLocationList`);
      // console.log(
      //   'getLocationListgetLocationListgetLocationList',
      //   response?.data,
      // );
      if (response?.data?.status) {
        setlocationList(response?.data?.data);
      }
    } catch (err) {
      console.log('errr', err);
    }
  };
  const handleSetCity = async (item, locationId) => {
    await AsyncStorage.setItem('city', item);
    await AsyncStorage.setItem('locationId', locationId);
    const authToken = await AsyncStorage.getItem('token');
    const skipcheck = await AsyncStorage.getItem('SkipForNow');
    console.log('city', item);
    dispatch(setCity(item));
    setModalVisible(!modalVisible);
    setTimeout(() => {
      if (authToken || skipcheck) {
        if(from){
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'MyAccountScreen'}], // Replace 'TargetScreen' with the name of your target screen
            }),
          );
        }else{
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'BottomNavigator'}], // Replace 'TargetScreen' with the name of your target screen
            }),
          );
        }
        
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'LoginScreen', // Replace with the name of your target screen
                params: {
                  from: null,
                  eventDetailsData: null,
                  id: null,
                  fromSecond: null,
                  Razorpay:null
                }, // Include the params you want to send
              },
            ],
          }),
        );
      }
    }, 0);
  };
  const selectedCityStyle = () => ({
    marginLeft: 10,
    color: colors.primary,
  });
  const searchlocationFunc = async () => {
    try {
      const response = await axios.get(
        `${APIURL}/searchLocation?search=${searchCity}`,
      );
      console.log('respnseeeeee222------------', response?.data);
      setsearchList(response?.data?.data);
    } catch (err) {
      console.log('errrr', err);
    }
  };
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(async result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            getCityName();
            break;
          case RESULTS.DENIED:
            getCityName();

            break;
          case RESULTS.LIMITED:
            getCityName();

            break;
          case RESULTS.GRANTED:
            getCityName();

            break;
          case RESULTS.BLOCKED:
            getCityName();

            break;
        }
      });
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCityName();

          RNAndroidLocationEnabler?.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
          })
            .then(async data => {
              getCityName();
            })
            .catch(async err => {
              if (err?.message == 'denied') {
                getCityName();
              }
            });
        } else {
          getCityName();
        }
      } catch (err) {
        console.log('err===>', err);
        getCityName();
      }
    }
  };

  const getCityName = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('latitude', latitude);
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`,
        )
          .then(response => response.json())
          .then(data => {
            const addressComponents = data.results[0].address_components;
            const city = addressComponents.find(component =>
              component.types.includes('locality'),
            );
            if (city) {
              console.log('city.long_namecity.long_name', city.long_name);
              let locationID = locationList.filter(item => {
                return item?.cityName == city.long_name;
              })[0]?._id;
              handleSetCity(city.long_name, locationID);
            }
          })
          .catch(error => {
            console.error(error);
          });
      },
      error => {
        console.error(error);
      },
    );
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView>
            <Text style={styles.main__Heading}>Change your city</Text>
            <TouchableOpacity 
            activeOpacity={0.9}
            style={styles.currentLocation__container} onPress={getfun}>
              <MaterialIcons
                name={'location-searching'}
                size={20}
                color={colors.primary}
              />
              <Text style={styles.currentLocation__text}>
                Use my current location
              </Text>
            </TouchableOpacity>
            <View style={styles.middle__container}>
              {locationList?.map((item, index) => (
                <TouchableOpacity
                  style={styles.city__container}
                  key={index}
                  activeOpacity={0.9}
                  onPress={() => handleSetCity(item.cityName, item?._id)}>
                  {city === item.cityName ? (
                    <MaterialIcons
                      name="location-on"
                      color={colors.primary}
                      size={25}
                    />
                  ) : null}
                  <Text
                    style={[
                      styles.city,
                      city === item.cityName ? selectedCityStyle() : null,
                    ]}>
                    {item.cityName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholder={'Search all cities'}
                value={searchCity}
                onChangeText={txt => {
                  setsearchCity(txt);
                }}
                // Add any other TextInput props you need
              />
              <TouchableOpacity style={styles.iconContainer} activeOpacity={0.9}>
                <MaterialIcons name={'search'} size={25} color={'grey'} />
              </TouchableOpacity>
            </View>
            <View style={styles.middle__container}>
              {searchList?.map((item, index) => (
                <TouchableOpacity
                  style={styles.city__container}
                  activeOpacity={0.9}
                  key={index}
                  onPress={() => handleSetCity(item.cityName, item?._id)}>
                  {city === item.cityName ? (
                    <MaterialIcons
                      name="location-on"
                      color={colors.primary}
                      size={25}
                    />
                  ) : null}
                  <Text
                    style={[
                      styles.city,
                      city === item.cityName ? selectedCityStyle() : null,
                    ]}>
                    {item.cityName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          {/*  */}
        </View>
      </View>
    </Modal>
  );
};

export default PickCityModal;
