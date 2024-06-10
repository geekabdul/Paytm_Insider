import {StyleSheet, Dimensions} from 'react-native';
import {textStyle} from '../../style/text.style';
import {colors} from '../../style/colors.style';
const {width} = Dimensions.get('window');
export default StyleSheet.create({
  main__container: {
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    width: width / 4.1,
    marginHorizontal:10
    // marginLeft: 10,
  },
  imgStyle: {
    width: 40,
    height: 30,
    resizeMode: 'contain',
  },

  title: {
    marginTop: 5,
    color: colors.blackish,
  },

  counts: {
    marginTop: 2,
    backgroundColor: colors.lightPrimary,
    color: colors.primary,
    fontWeight: '500',
    borderRadius: 999,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
});
