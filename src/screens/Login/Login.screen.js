import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import styles from './Login.style';
import InputField from '../../components/InputField/InputField';

import {useNavigation} from '@react-navigation/native';
import DisableButton from '../../components/DisableButton/DisableButton';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import axios from 'axios';
import {APIURL} from '../../Helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const LoginScreen = props => {
  const {from, eventDetailsData, id, fromSecond,Razorpay} = props?.route?.params;
  const navigation = useNavigation();
  const Width = Dimensions.get('window').width;
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleContinue = async () => {
    try {
      const params = {
        emailId: email,
      };
      const response = await axios.post(`${APIURL}/sendOtp`, params);
      console.log('responseresponseresponse', response?.data);
      if (response?.data?.status) {
        navigation.navigate('OTPScreen', {
          email,
          data: response?.data?.data,
          from: from,
          eventDetailsData: eventDetailsData,
          id: id,
          fromSecond: fromSecond,
          Razorpay:Razorpay
        });
        setEmail('');
      }
    } catch (err) {
      console.log('errr', err);
    }
  };

  // check valid email
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const inputChangeHandle = txt => {
    setEmail(txt);
    if (emailRegex.test(txt)) {
      // Valid email address
      // Alert.alert('Success', 'Valid email address');
      setIsEmailValid(true);
    } else {
      // Invalid email address
      // Alert.alert('Error', 'Invalid email address');
      setIsEmailValid(false);
    }
  };
  const Skipfornow = async () => {
    let data = await AsyncStorage.setItem('SkipForNow', 'SkipForNow');
    navigation.navigate('BottomNavigator');
  };
  // React.useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       '578210899343-too1mo86otnravpkj31nsr5ha9hebc01.apps.googleusercontent.com',
  //     offlineAccess: true,
  //   });
  // }, []);
  // const GoogleSingUp = async () => {
  //   console.log('hey google here');
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     await GoogleSignin.signIn().then(result => {
  //       console.log('result 123456', result);

  //       // let userData = Object.assign(
  //       //   {},
  //       //   {
  //       //     api_key: result.idToken,
  //       //     id: result.user.id,
  //       //     name: result.user.name,
  //       //     photo: result.user.photo,
  //       //     email: result.user.email,
  //       //     type: 'regular',
  //       //     role: 'google',
  //       //     phone: null,
  //       //     phone_prefix: null
  //       //   },
  //       // );
  //     });
  //   } catch (error) {
  //     console.log('erorrr in google login ', error);
  //     Alert.alert('Somthing went wrong');
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //       alert('User cancelled the login flow !');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       alert('Signin in progress');
  //       // operation (f.e. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       alert('Google play services not available or outdated !');
  //       // play services not available or outdated
  //     }
  //   }
  // };

  const signIn = async () => {
    try {
      GoogleSignin.configure({
        // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        // androidClientId:
        //   '880463673394-hp2s28e6hjdcm65qjqrlogfohevk5296.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        webClientId:
          '1022725813682-cse8eqqi5epafc5s6dm7fb0eslskkf3p.apps.googleusercontent.com',
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        hostedDomain: '', // specifies a hosted domain restriction
        forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        accountName: '', // [Android] specifies an account name on the device that should be used
        // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
        openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
        profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
      });
      await GoogleSignin.hasPlayServices();
      console.log('reached google sign in');
      const userInfo = await GoogleSignin.signIn();
      const code = await GoogleSignin.getTokens();
      console.log(userInfo, code);
    } catch (err) {
      console.log('err',err);
    }
  };
  return (
    <View style={styles.main__container}>
      <View style={styles.headings}>
        <Text style={styles.mainHeading}>Enter your email address</Text>
        <Text style={styles.subHeading}>
          We'll create an account if you don't have one yet
        </Text>
      </View>
      <View style={styles.body__container}>
        <View style={styles.input__container}>
          <InputField
            value={email}
            onChangeValue={inputChangeHandle}
            placeholder={'johndoe@gmail.com'}
            keyboardType={'email-address'}
          />
        </View>
        {!isEmailValid ? (
          <DisableButton btnText={'CONTINUE'} />
        ) : (
          <PrimaryButton btnText={'CONTINUE'} btnHandle={handleContinue} />
        )}

        <TouchableOpacity
          onPress={() => signIn()}
          style={{
            alignItems: 'center',
            paddingHorizontal: 5,
            marginVertical: 30,
          }}>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            style={{width: Width / 1.25, height: 45}}
          />
        </TouchableOpacity>
        {from ? null : (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              Skipfornow();
            }}>
            <Text
              style={{alignSelf: 'center', marginVertical: 10, color: 'black'}}>
              Skip for Now
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default LoginScreen;
