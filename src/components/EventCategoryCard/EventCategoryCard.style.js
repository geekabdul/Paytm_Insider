import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../style/colors.style';

const {width} = Dimensions.get('window');
export default StyleSheet.create({
  main__container: {
    // marginHorizontal: 10,
    width: width / 4,
  },
  imgStyle: {
    width: width / 3.7,
    height: 70,
    resizeMode: 'contain',
    borderRadius: 5,
  },
});
