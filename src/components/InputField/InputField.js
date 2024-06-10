import {TextInput} from 'react-native';
import React from 'react';
import styles from './InputField.style';
const InputField = ({
  onChangeValue,
  value,
  keyboardType,
  placeholder,
  inputCustomStyle,
  autoFocus = false,
  multiline = false,
  numberOfLines,
  textAlignVertical,
}) => {
  // const [text, onChangeText] = React.useState('');
  return (
    <TextInput
      multiline={multiline}
      numberOfLines={numberOfLines}
      style={[styles.input, inputCustomStyle]}
      onChangeText={onChangeValue}
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType}
      autoCapitalize="none"
      autoFocus={autoFocus}
      textAlignVertical={textAlignVertical}
    />
  );
};

export default InputField;
