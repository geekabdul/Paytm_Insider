import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../screens/Login/Login.screen';
import OTPScreen from '../screens/OTP/OTP.screen';
import PickCityScreen from '../screens/PickCity/PickCity.screen';
import BottomNavigator from '../BottomNavigator/BottomNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setCity} from '../ReduxToolkit/slices/citySlice';
import Loader from '../components/Loader/Loader';
import ProfileScreen from '../screens/Profile/Profile.screen';
import EventDetailsScreen from '../screens/EventDetails/EventDetails.screen';
import EventListScreen from '../screens/EventList/EventList.screen';
import ArtistsVenueScreen from '../screens/ArtistsVenue/ArtistsVenue.screen';
import FavrouriteScreen from '../screens/Favourites/Favrourites.screen';
import TicketsScreen from '../screens/Tickets/Tickets.screen';
import MagazineScreen from '../screens/Magazine/Magazine.screen';
import BuyNowScreen from '../screens/BuyNowScreen/BuyNowScreen';
import AboutUsScreen from '../screens/AboutUs/AboutUs.screen';
import HelpCenterScreen from '../screens/HelpCenter/HelpCenter.screen';
import FAQScreen from '../screens/FAQ/FAQ.screen';
import SignOutScreen from '../screens/SignOut/SignOut.screen';
import ArtistVenueListScreen from '../screens/ArtistsVenueList/ArtistVenueList.screen';
import BrowseEventsScreen from '../screens/BrowseEvents/BrowseEvents.screen';
import TicketInfoScreeen from '../screens/TicketInfo/TicketInfo.screen';

const Stack = createNativeStackNavigator();
const RouteScreen = () => {
  const [isCity, setIsCity] = useState('Loading');
  const [token, settoken] = useState('Loading');
  const [Skipfornow, setSkipfornow] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const authToken = await AsyncStorage.getItem('token');
    const city = await AsyncStorage.getItem('city');
    const skipcheck = await AsyncStorage.getItem('SkipForNow');
    setSkipfornow(skipcheck);
    settoken(authToken);
    console.log('citycitycitycity', city);
    if (city !== null) {
      dispatch(setCity(city));
    }
    setIsCity(city);
  };
  console.log('tokentoken', token, isCity);
  return (
    <>
      {isCity !== 'Loading' ? (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={
              isCity
                ? token || Skipfornow
                  ? 'BottomNavigator'
                  : 'PickCityScreen'
                : 'PickCityScreen'
            }>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="OTPScreen"
              component={OTPScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PickCityScreen"
              component={PickCityScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="BottomNavigator"
              component={BottomNavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EventDetailsScreen"
              component={EventDetailsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="BuyNowScreen"
              component={BuyNowScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EventListScreen"
              component={EventListScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="BrowseEventsScreen"
              component={BrowseEventsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ArtistsVenueScreen"
              component={ArtistsVenueScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ArtistVenueListScreen"
              component={ArtistVenueListScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="FavrouriteScreen"
              component={FavrouriteScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="TicketsScreen"
              component={TicketsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="TicketInfoScreeen"
              component={TicketInfoScreeen}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="MagazineScreen"
              component={MagazineScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AboutUsScreen"
              component={AboutUsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HelpCenterScreen"
              component={HelpCenterScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="FAQScreen"
              component={FAQScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignOutScreen"
              component={SignOutScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default RouteScreen;
