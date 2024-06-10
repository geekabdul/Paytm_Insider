import {StyleSheet} from 'react-native';
import {colors} from '../../style/colors.style';
import {textStyle} from '../../style/text.style';
import {fonts} from '../../style/fonts.style';
export default StyleSheet.create({
  main__container: {
    backgroundColor: colors.secondary,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 10,
  },
  btnText: {
    fontFamily: fonts.KorolevBold,
    ...textStyle.text3XLarge,
    color: colors.white,
  },
});
