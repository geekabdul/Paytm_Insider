import {StyleSheet} from 'react-native';
import {textStyle} from '../../style/text.style';
import {colors} from '../../style/colors.style';

export default StyleSheet.create({
  main__container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  main__heading: {
    marginTop: 70,
    color: colors.blackish,
    ...textStyle.text6XLarge,
    ...textStyle.textBold,
  },
  container: {
    marginTop: 40,
    width: '100%',
  },
  dropDown__container: {
    borderWidth: 0.7,
    borderRadius: 3,
    borderColor: colors.lightgrey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 20,
    paddingVertical: 10,
  },
  dropDown__title: {
    ...textStyle.text4XLarge,
    color: colors.black,
    fontWeight: '600',
  },
  bottom__container: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomText1: {
    flex: 1,
    fontStyle: 'italic',
    ...textStyle.textSmall,
    flexWrap: 'wrap',
  },
  detectLocation__container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomText2: {
    marginLeft: 8,
    color: colors.secondary,
    fontWeight: '500',
  },
});
