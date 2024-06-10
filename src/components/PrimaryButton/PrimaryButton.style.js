import {StyleSheet} from 'react-native';
import {colors} from '../../style/colors.style';
import {textStyle} from '../../style/text.style';

export default StyleSheet.create({
  main__container: {
    backgroundColor: colors.primary,
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
