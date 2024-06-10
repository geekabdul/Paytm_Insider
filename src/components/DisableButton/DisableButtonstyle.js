import {StyleSheet} from 'react-native';
import {colors} from '../../style/colors.style';
import {textStyle} from '../../style/text.style';

export default StyleSheet.create({
  main__container: {
    // backgroundColor: colors.lightgrey,
    backgroundColor: 'rgb(238, 238, 238)',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnText: {
    ...textStyle.textXLarge,
    color: colors.black,
    ...textStyle.textBold,
  },
});
