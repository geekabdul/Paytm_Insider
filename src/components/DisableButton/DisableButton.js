import {View, Text} from 'react-native';
import React from 'react';
import styles from './DisableButtonstyle';

const DisableButton = ({btnText}) => {
  return (
    <View style={styles.main__container}>
      <Text style={styles.btnText}>{btnText}</Text>
    </View>
  );
};

export default DisableButton;
