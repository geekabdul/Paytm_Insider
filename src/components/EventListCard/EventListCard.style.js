import {Dimensions, StyleSheet} from 'react-native';
import {textStyle} from '../../style/text.style';

const {width} = Dimensions.get('window');
export default StyleSheet.create({
  main__container: {
    marginVertical: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
  },
  imageStyle: {
    width: width / 1.2,
    height: 165,
    resizeMode: 'contain',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  details__container: {
    width: width / 1.2,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  cardHeading: {
    ...textStyle.textLarge,
    flexShrink: 1,
    color: 'black',
    fontWeight: '700',
  },
  cardDate: {
    fontWeight: '500',
  },
  locationText: {
    marginTop: 5,
    fontWeight: '500',
  },
  cardFooter__container: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  eventAmount__Text: {
    fontWeight: '700',
    color: 'black',
  },
  like__container: {flexDirection: 'row', alignItems: 'center'},
  numberOflike: {
    marginRight: 5,
  },
});
