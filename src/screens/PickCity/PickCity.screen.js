import {View, Text, TouchableOpacity, PermissionsAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './PickCity.style';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../style/colors.style';
import PickCityModal from '../../components/PickCityModal/PickCityModal';
import {useDispatch, useSelector} from 'react-redux';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {APIURL} from '../../Helper';
import {useNavigation} from '@react-navigation/native';
import {setCity} from '../../ReduxToolkit/slices/citySlice';
import {CommonActions} from '@react-navigation/native';

const PickCityScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const city = useSelector(state => state.city.city);
  const [cityName, setCityName] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const API_KEY = 'AIzaSyDMLeWZW0BxtJfflLb2a8Qj1VVUJaaP5jI';

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
              setCityName(city.long_name);
              handleSetCity(city.long_name);
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
  const getLocationList = async city => {
    try {
      const response = await axios.get(`${APIURL}/getLocationList`);
      let locationID = response?.data?.data.filter(item => {
        return item?.cityName == city;
      })[0]._id;
      console.log('locationIDlocationID', locationID);

      return locationID;
    } catch (err) {
      console.log('errr', err);
    }
  };
  const handleSetCity = async item => {
    await AsyncStorage.setItem('city', item);
    let locationId = await getLocationList(item);
    console.log('locationIDlocationIDyyyyyyyyyyyyyyyyyyyyy', locationId);

    await AsyncStorage.setItem('locationId', locationId);
    const authToken = await AsyncStorage.getItem('token');
    const skipcheck = await AsyncStorage.getItem('SkipForNow');
    console.log('city', item);
    dispatch(setCity(item));
    setTimeout(() => {
      if (authToken || skipcheck) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'BottomNavigator'}], // Replace 'TargetScreen' with the name of your target screen
          }),
        );
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
  return (
    <View style={styles.main__container}>
      <Text style={styles.main__heading}>Pick your city</Text>
      <View style={styles.container}>
        <TouchableOpacity
        activeOpacity={0.9}
          style={styles.dropDown__container}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.dropDown__title}>{city}</Text>
          <Entypo name="chevron-small-down" color={colors.black} size={25} />
        </TouchableOpacity>
        <View style={styles.bottom__container}>
          <Text style={styles.bottomText1}>
            You can change this later
            {city !== 'Pick Your City'
              ? ', or now if this is not your city.'
              : '.'}
          </Text>
          <TouchableOpacity
          activeOpacity={0.9}
            style={styles.detectLocation__container}
            onPress={() => {
              requestLocationPermission();
            }}>
            <MaterialIcons
              name={'location-searching'}
              size={20}
              color={colors.secondary}
            />
            <Text style={styles.bottomText2}>Detect my location</Text>
          </TouchableOpacity>
        </View>
      </View>
      <PickCityModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        from = {false}
      />
    </View>
  );
};

export default PickCityScreen;
