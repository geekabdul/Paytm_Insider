import {Dimensions, StyleSheet} from 'react-native';
import {textStyle} from '../../style/text.style';
import {colors} from '../../style/colors.style';
import {fonts} from '../../style/fonts.style';
const {width} = Dimensions.get('window');
export default StyleSheet.create({
  main__container: {
    marginHorizontal: 12,
    borderRadius: 10,
    width: width / 1.5,
    marginVertical: 20,

  },
  cardImage: {
    height: 255,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  eventType__container: {
    position: 'absolute',
    right: 10,
    top: 8,
    backgroundColor: colors.primary,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  eventTypeText: {color: 'white', fontWeight: '500'},
  aboutEvent: {
    height: '50%',
    position: 'absolute',
    padding: 9,
    bottom: 0,
    paddingHorizontal: 8,
    width: '100%',
    justifyContent: 'flex-end',
  },
  details__container: {
    backgroundColor: 'white',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
    paddingHorizontal: 8,
  },
  eventName: {
    color: colors.white,
    fontWeight: '500',
    ...textStyle.textRegular,
  },
  TimeLocation__container: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  evetTimeLocation: {
    marginLeft: 9,
    flex: 1,
    color: colors.blackish,
  },
  location__container: {marginVertical: 5},
  bottom__container: {
    backgroundColor: colors.lightPrimary,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  BuyNowLine__container: {flexDirection: 'row'},
  horizontalLine: {
    width: 1,
    backgroundColor: colors.primary,
    marginRight: 10,
  },
  bottomText: {
    color: colors.black,
    fontFamily: fonts.KorolevBold,
  },
});
