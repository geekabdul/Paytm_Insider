import {View, Text,TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './BackHeader.style.js';
import Ionicons from 'react-native-vector-icons/Ionicons.js';
import {colors} from '../../style/colors.style.js';
import {useNavigation} from '@react-navigation/native';
const BackHeader = ({headerTitle, rightIcon, rightIconhandle}) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.main__container}>
        <View style={styles.headerContent__container}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.9}>
            <Ionicons name="arrow-back-sharp" size={25} color={colors.black} />
          </TouchableOpacity>
          <View style={styles.headerTitle__container}>
            <Text numberOfLines={1} style={styles.title}>
              {headerTitle}
            </Text>
          </View>
          {rightIcon === 'share' ? (
            <TouchableOpacity
            activeOpacity={0.9}
              style={styles.leftIcon__container}
              onPress={rightIconhandle}>
              <Ionicons name="share-social" size={25} color={colors.black} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {headerTitle ? null : <View style={styles.bottomLine} />}
    </>
  );
};

export default BackHeader;
