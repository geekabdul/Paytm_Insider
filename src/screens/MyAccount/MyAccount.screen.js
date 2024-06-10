import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './MyAccount.style';
import Header from '../../components/Header/Header';
import {useSelector} from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../style/colors.style';
import PickCityModal from '../../components/PickCityModal/PickCityModal';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SecondaryButton from '../../components/SecondaryButton/SecondaryButton';
import {APIURL} from '../../Helper';
import axios from 'axios';

const itemData = [
  {title: 'Tickets', leftIcon: 'ticket-outline', route: 'TicketsScreen'},
  {title: 'Favourites', leftIcon: 'heart-outlined', route: 'FavrouriteScreen'},
];

const bottomData = [
  {title: 'About Us', route: 'AboutUsScreen'},
  {title: 'Help Center', route: 'HelpCenterScreen'},
  {title: 'FAQ', route: 'FAQScreen'},
];
const MyAccountScreen = () => {
  const navigation = useNavigation();
  const focus = useIsFocused();
  const city = useSelector(state => state.city.city);
  const [modalVisible, setModalVisible] = useState(false);
  const [UserDetail, setUserDetail] = useState(null);
  const [token, setToken] = useState(null);

  const handleShowModal = () => {
    setModalVisible(true);
  };
  useEffect(() => {
    getData();
  }, [focus]);
  const getData = async () => {
    let token = await AsyncStorage.getItem('token');
    let Details = await AsyncStorage.getItem('UserDetail');
    setToken(token);
    setUserDetail(JSON.parse(Details));
    console.log('token:', token);
    console.log('Details', Details);
  };
  const signOut = async () => {
    const authToken = await AsyncStorage.getItem('token');
    console.log('authTokenauthToken', authToken);
    const headers = {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    };
    try {
      let response = await axios.get(`${APIURL}signOut`, {
        headers,
      });
      console.log('respppppp', response?.data);
      if (response?.data?.status) {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('UserDetail');
        getData();
      }
    } catch (error) {
      console.log('error', error?.response?.data);
    }
  };
  return (
    <View style={styles.main__container}>
      <Header />
      <View style={styles.body__container}>
        <View style={styles.userInfo__container}>
          {token ? (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.userInfoEdit__container}
              onPress={() =>
                navigation.navigate('ProfileScreen', {
                  Oldemail: UserDetail?.emailId,
                  OldFirstName: UserDetail?.firstName,
                  OldLastName: UserDetail?.lastName,
                  OldNumber: UserDetail?.mobileNumber,
                })
              }>
              <View style={styles.userNameEmail__container}>
                <Text style={styles.userName}>
                  {UserDetail?.firstName} {UserDetail?.lastName}
                </Text>
                <Text style={styles.userEmail} numberOfLines={2}>
                  {UserDetail?.emailId}
                </Text>
              </View>
              <View style={styles.edit__parentContainer}>
                <Pressable
                  style={styles.edit__Container}
                  android_ripple={{color: 'pink'}}
                  onPress={() =>
                    navigation.navigate('ProfileScreen', {
                      Oldemail: UserDetail?.emailId,
                      OldFirstName: UserDetail?.firstName,
                      OldLastName: UserDetail?.lastName,
                      OldNumber: UserDetail?.mobileNumber,
                    })
                  }>
                  <Text style={styles.editText}>EDIT</Text>
                </Pressable>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.signIn_parentContainer}>
              <TouchableOpacity
                style={styles.SignInBtn}
                // activeOpacity={0.9}
                onPress={() => {
                  navigation.navigate('LoginScreen', {
                    from: 'MyAccountScreen',
                    eventDetailsData: null,
                    id: null,
                    fromSecond: null,
                  });
                }}>
                <SecondaryButton
                  btnText={'SIGN IN'}
                  customContainerStyles={styles.signInChildContainer}
                  customBtnTextStyle={styles.signInText}
                />
              </TouchableOpacity>
              <Text style={styles.signInInstruction}>
                Sign in to access tickets and gameshows
              </Text>
            </View>
          )}
          <View style={styles.stashLocation__container}>
            {token ? (
              <>
                <TouchableOpacity
                  style={styles.tab__container}
                  activeOpacity={0.9}>
                  <Text style={styles.tabTitle}>₹0 Stash</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.tab__container}
                  onPress={handleShowModal}>
                  <View style={styles.mapIcon__container}>
                    <SimpleLineIcons
                      name="location-pin"
                      size={15}
                      color={colors.black}
                    />
                  </View>
                  <Text numberOfLines={1} style={styles.tabTitle}>
                    {city}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.tab__container, token ? null : {width: ''}]}
                onPress={handleShowModal}>
                <View style={styles.mapIcon__container}>
                  <SimpleLineIcons
                    name="location-pin"
                    size={15}
                    color={colors.black}
                  />
                </View>
                <Text
                  numberOfLines={1}
                  style={[styles.tabTitle, token ? null : {width: ''}]}>
                  {city}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {token ? (
          <View style={styles.middle__container}>
            {itemData?.map((el, index) => (
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.item__container}
                key={index}
                onPress={() => navigation.navigate(el.route)}>
                {el.title === 'Tickets' ? (
                  <Ionicons name={el.leftIcon} size={25} color={'black'} />
                ) : (
                  <Entypo name={el.leftIcon} size={25} color={'black'} />
                )}
                <View style={styles.title__container}>
                  <Text style={styles.itemTittle}>{el.title}</Text>
                  <Ionicons name="chevron-forward" size={25} color={'black'} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.middle__container}>
            {itemData?.map((el, index) => (
              <Pressable
                android_ripple={{color: 'lightgrey'}}
                style={styles.item__container}
                key={index}
                // onTouchEnd={() => navigation.navigate(el.route)}
              >
                {el.title === 'Tickets' ? (
                  <Ionicons name={el.leftIcon} size={25} color={'lightgrey'} />
                ) : (
                  <Entypo name={el.leftIcon} size={25} color={'lightgrey'} />
                )}
                <View style={styles.title__container}>
                  <Text style={styles.itemTittle_disable}>{el.title}</Text>
                  {/* <Ionicons name="chevron-forward" size={25} color={'black'} /> */}
                </View>
              </Pressable>
            ))}
          </View>
        )}

        <View style={styles.bottom__container}>
          {bottomData?.map((bottomItem, index) =>
            token || bottomItem.title !== 'Sign Out' ? (
              <TouchableOpacity
                style={styles.bottomItem__container}
                key={index}
                activeOpacity={0.9}
                onPress={() => navigation.navigate(bottomItem.route)}>
                <Text style={styles.bottomItem_tittle}>{bottomItem.title}</Text>
              </TouchableOpacity>
            ) : null,
          )}
          {token ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                signOut();
              }}>
              <Text style={styles.bottomItem_tittle}>Sign Out</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        {/* <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.removeItem('recentViewedEvents');
          }}>
          <Text style={styles.itemTittle}>History Delete</Text>
        </TouchableOpacity> */}
      </View>
      <PickCityModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        from={true}
      />
    </View>
  );
};

export default MyAccountScreen;
