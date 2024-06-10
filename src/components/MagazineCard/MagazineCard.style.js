import {StyleSheet, Dimensions} from 'react-native';

import {textStyle} from '../../style/text.style';
const {width} = Dimensions.get('window');
export default StyleSheet.create({
  main__container: {
    marginVertical: 20,
    width: width / 1.5,
    marginHorizontal: 12,
  },
  backgroundImg: {
    height: 235,
    resizeMode: 'contain',
    justifyContent: 'flex-end',
  },
  imageStyle: {borderRadius: 20},
  title__container: {
    padding: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    ...textStyle.textRegular,
    fontWeight: '500',
    lineHeight: 22,
  },
  subTitle: {
    marginTop: 10,
    color: 'white',
    fontSize: 13,
  },
});
