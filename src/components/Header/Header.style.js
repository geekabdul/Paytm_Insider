import {StyleSheet} from 'react-native';
import {colors} from '../../style/colors.style';
import {textStyle} from '../../style/text.style';

export default StyleSheet.create({
  main__container: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    // paddingVertical: 10,
  },
  content__container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoStyle: {
    height: 65,
    width: 130,
  },
  location__container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  cityName: {
    marginHorizontal: 10,
    color: colors.black,
    ...textStyle.textSmall,
  },
});
