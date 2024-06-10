import {StyleSheet} from 'react-native';
import {colors} from '../../style/colors.style';
import {textStyle} from '../../style/text.style';

export default StyleSheet.create({
  main__container: {
    backgroundColor: colors.white,
    height: 55,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  headerContent__container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle__container: {
    marginLeft: 25,
    flex: 1,
  },
  bottomLine: {
    marginHorizontal: 20,
    height: 0.5,
    backgroundColor: colors.lightgrey,
  },
  title: {
    color: 'black',
    ...textStyle.textLarge,
  },
  leftIcon__container: {
    marginRight: 10,
  },
});
