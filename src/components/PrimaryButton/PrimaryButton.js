import {Text, View,TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './PrimaryButton.style';

const PrimaryButton = ({
  btnText,
  btnHandle,
  customContainerStyle,
  customTitleStyle,
}) => {
  return (
    <TouchableOpacity
    activeOpacity={0.9}
      style={[styles.main__container, customContainerStyle]}
      onPress={btnHandle}>
      <Text style={[styles.btnText, customTitleStyle]}>{btnText}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
