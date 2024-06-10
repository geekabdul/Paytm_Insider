import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import styles from './profile.style';
import BackHeader from '../../components/BackHeader/BackHeader';
import InputField from '../../components/InputField/InputField';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import {APIURL} from '../../Helper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = props => {
  const {Oldemail, OldFirstName, OldLastName, OldNumber} = props.route.params;
  const [firstName, setFirstName] = useState(OldFirstName || '');
  const [lastName, setLastName] = useState(OldLastName || '');
  const [mobileNo, setmobileNo] = useState(OldNumber?.toString() || '');
  const [email, setemail] = useState(Oldemail || '');
  const navigation = useNavigation();

  const firstNameHandle = fname => {
    setFirstName(fname);
  };
  const lastNameHandle = lname => {
    setLastName(lname);
  };
  const emailNamehandler = email => {
    setemail(email);
  };
  const mobileNoHandle = number => {
    setmobileNo(number);
  };

  const handleUpdate = async () => {
    const authToken = await AsyncStorage.getItem('token');

    try {
      if (email && firstName && lastName && mobileNo) {
        const params = {
          emailId: email,
          firstName: firstName,
          lastName: lastName,
          mobileNumber: mobileNo,
        };
        const headers = {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        };
        const response = await axios.post(`${APIURL}/saveUserDetails`, params, {
          headers,
        });
        console.log('responseresponseresponse', response?.data);
        if (response?.data?.status) {
          await AsyncStorage.setItem(
            'UserDetail',
            JSON.stringify(response?.data?.data),
          );
          navigation.goBack();
        }
      } else {
        Alert.alert('Please fill all the fileds');
      }
    } catch (err) {
      console.log('errr', err);
    }
  };
  return (
    <View style={styles.main__container}>
      <BackHeader headerTitle={'Profile'} />
      <View style={styles.container}>
        <Text style={styles.heading}>Update your account details below</Text>
        <View style={styles.inputs__container}>
          <View style={styles.inputFields__container}>
            <InputField
              value={email}
              onChangeValue={emailNamehandler}
              placeholder={'Type Your Name...'}
              inputCustomStyle={styles.inputStyle}
            />
          </View>
          <View style={styles.inputFields__container}>
            <InputField
              value={firstName}
              onChangeValue={firstNameHandle}
              placeholder={'Type first name...'}
              inputCustomStyle={styles.inputStyle}
            />
          </View>
          <View style={styles.inputFields__container}>
            <InputField
              value={lastName}
              onChangeValue={lastNameHandle}
              placeholder={'Type last name...'}
              inputCustomStyle={styles.inputStyle}
            />
          </View>
          <View style={styles.inputFields__container}>
            <InputField
              value={mobileNo}
              onChangeValue={mobileNoHandle}
              placeholder={'Mobile Number'}
              inputCustomStyle={styles.inputStyle}
              keyboardType={'numeric'}
            />
          </View>
        </View>
        <PrimaryButton btnText={'UPDATE'} btnHandle={handleUpdate} />
      </View>
    </View>
  );
};

export default ProfileScreen;
