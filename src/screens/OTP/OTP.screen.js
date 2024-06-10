import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import styles from './OTP.style';
// import Header from '../../components/BackHeader/BackHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import DisableButton from '../../components/DisableButton/DisableButton';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import BackHeader from '../../components/BackHeader/BackHeader';
import axios from 'axios';
import {APIURL} from '../../Helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {email, data, from, eventDetailsData, id,fromSecond,Razorpay} = route.params;

  const [otp, setOtp] = useState();
  const [isOtpFilled, setIsOtpFilled] = useState(false);

  const handleCodeChange = code => {
    console.log('otp', code);
    setOtp(code);
    if (code?.length < 6) {
      setIsOtpFilled(false);
    } else {
      setIsOtpFilled(true);
    }
  };

  const submitBtnHandle = async () => {
    try {
      const params = {
        emailId: email,
        otp: otp,
      };
      const response = await axios.post(`${APIURL}/verifyOtp`, params);
      console.log('responseresponseresponse', response?.data);
      if (response?.data?.status) {
        await AsyncStorage.setItem('token', response?.data?.data?.token);
        await AsyncStorage.setItem(
          'UserDetail',
          JSON.stringify(response?.data?.data),
        );
        if (from == 'BuyNowScreen') {
          navigation.navigate('BuyNowScreen', {
            eventDetailsData: eventDetailsData,
            Razorpay:Razorpay
          });
        } else if (from == 'EventDetailsScreen') {
          navigation.navigate('EventDetailsScreen', {
            id: id,
          });
        } else if (from == 'ArtistsVenueScreen') {
          navigation.navigate('ArtistsVenueScreen', {
            id: id,
            from:fromSecond
          });
        } else {
          navigation.navigate('BottomNavigator');
        }
      }
    } catch (err) {
      console.log('errr', err);
    }
    // if (data?.otp === otp) {
    //   console.log('correct');
    //   navigation.navigate('PickCityScreen');
    // } else {
    //   Alert.alert('Invalid OTP');
    //   console.log('wrong');
    // }
  };
  return (
    <View style={styles.main__container}>
      <BackHeader />
      <View style={styles.container}>
        <Text style={styles.OTP__heading}>Enter OTP</Text>
        <Text style={styles.subHeading}>
          Please enter the 6 digit OTP we have sent you via email on{' '}
          <Text style={styles.email}>{email}</Text>
        </Text>
        <View style={styles.OTP__container}>
          <Text style={styles.resendOTP}>Resend OTP</Text>
          <OTPInputView
            style={styles.inputBox}
            pinCount={6}
            onCodeChanged={handleCodeChange}
            autoFocusOnLoad={false}
            codeInputFieldStyle={styles.underlineStyleBase}
          />
        </View>
        {!isOtpFilled ? (
          <DisableButton btnText={'SUBMIT'} />
        ) : (
          <PrimaryButton btnText={'SUBMIT'} btnHandle={submitBtnHandle} />
        )}
        <View style={styles.bottomContent__container}>
          <Text style={styles.bottomContent}>
            Trouble signing in? Try a different login method or{' '}
            <Text style={styles.contactSupport}>Contact Support</Text>
          </Text>
        </View>
        <Text>test otp - {data?.otp}</Text>
      </View>
    </View>
  );
};

export default OTPScreen;
