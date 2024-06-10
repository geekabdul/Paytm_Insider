import {StyleSheet} from 'react-native';
import {textStyle} from '../../style/text.style';
import {colors} from '../../style/colors.style';

export default StyleSheet.create({
  main__container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
  },
  headings: {
    // width: '100%',
  },
  mainHeading: {
    ...textStyle.textLarge,
    ...textStyle.textBold,
    color: colors.blackish,
  },
  subHeading: {
    color: colors.blackish,
  },

  body__container: {
    marginVertical: 15,
  },
  input__container: {
    marginVertical: 20,
  },
});
