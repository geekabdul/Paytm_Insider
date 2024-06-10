import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './SecondaryButton.style';

const SecondaryButton = ({
  btnText,
  btnHandle,
  customContainerStyles,
  customBtnTextStyle,
}) => {
  return (
    <View
      style={[styles.main__container, customContainerStyles]}
      onTouchEnd={btnHandle}
    >
      <Text style={[styles.btnText, customBtnTextStyle]}>{btnText}</Text>
    </View>
  );
};

export default SecondaryButton;
