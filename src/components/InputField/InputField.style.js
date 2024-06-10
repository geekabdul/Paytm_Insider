import {StyleSheet} from 'react-native';
import {colors} from '../../style/colors.style';
import {textStyle} from '../../style/text.style';

export default StyleSheet.create({
  input: {
    borderWidth: 0.5,
    borderColor: colors.grey,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    ...textStyle.textRegular,
    fontWeight: '500',
  },
});
