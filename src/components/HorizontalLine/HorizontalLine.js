import {View} from 'react-native';
import React from 'react';
import styles from './HorizontalLine.style';

const HorizontalLine = ({style}) => {
  return <View style={[styles.main__container, style]} />;
};

export default HorizontalLine;
