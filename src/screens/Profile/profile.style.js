import {StyleSheet} from 'react-native';
import {textStyle} from '../../style/text.style';

export default StyleSheet.create({
  main__container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    margin: 25,
    marginTop: 30,
  },
  heading: {
    color: 'black',
    fontWeight: '500',
    ...textStyle.text3XLarge,
  },
  inputs__container: {
    marginVertical: 10,
  },
  inputFields__container: {
    marginVertical: 7,
  },
  inputStyle: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
});
