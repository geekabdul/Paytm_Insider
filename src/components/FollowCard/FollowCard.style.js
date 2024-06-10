import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../style/colors.style';
import {textStyle} from '../../style/text.style';

const {width} = Dimensions.get('window');
export default StyleSheet.create({
  main__container: {
    marginVertical: 20,
    width: width / 2.6,
    marginHorizontal: 12,
  },
  backgroundstyle: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  title__container: {
    width: width / 3,
    position: 'absolute',
    bottom: -12,
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  title1: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '500',
  },
  title2: {
    color: colors.blackish,
  },
  footer__container: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 7,
  },
  following__container: {
    backgroundColor: colors.tab,
    borderRadius: 999,
    paddingVertical: 1,
    paddingHorizontal: 10,
  },
  unfollowing: {
    textAlign: 'center',
    color: 'grey',
    ...textStyle.textSmall,
  },
  follow__container: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 1,
    paddingHorizontal: 10,
  },
  follow: {
    textAlign: 'center',
    color: colors.primary,
    ...textStyle.textSmall,
  },
});
