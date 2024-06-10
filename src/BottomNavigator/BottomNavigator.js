import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/Home.screen';
import SearchScreen from '../screens/Search/Search.screen';
import MyAccountScreen from '../screens/MyAccount/MyAccount.screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../style/colors.style';

const HomeIcon = ({color}) => <Entypo name="home" color={color} size={25} />;
const SearchIcon = ({color}) => (
  <AntDesign name="search1" color={color} size={25} />
);
const AccountIcon = ({color}) => (
  <FontAwesome5 name="user-alt" color={color} size={25} />
);

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.secondary,
        tabBarStyle: {height: 55},
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <HomeIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Search',
          tabBarIcon: ({color}) => <SearchIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="MyAccountScreen"
        component={MyAccountScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'My Account',
          tabBarIcon: ({color}) => <AccountIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
