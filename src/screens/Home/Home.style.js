import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../style/colors.style';

const {width} = Dimensions.get('window');
export default StyleSheet.create({
  main__container: {
    flex: 1,
    // backgroundColor:colors
  },
  BannerParent__container: {
    backgroundColor: 'white',
    paddingVertical: 40,
  },
  caroselImageContainerStyle: {
    height: 220,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caroselImageStyle: {
    height: 200,
    width: width / 1.07,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  inActiveIndicatorStyle: {
    backgroundColor: 'grey',
  },
  activeIndicatorStyle: {
    backgroundColor: 'lightgrey',
    width: 13,
    height: 13,
  },
  indicatorContainerStyle: {top: 35},
  body__container: {
    marginVertical: 15,
    flex: 1,
  },
  eventCards__container: {
    flexDirection: 'row',
    // marginHorizontal: 7,
    marginBottom: 20,
  },
  eventCategoryCards__container: {
    marginHorizontal: 20,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    rowGap: 10,
    columnGap: 20,
  },
  boxCards__container: {
    // marginHorizontal: 10,
    // marginLeft: 30,
    marginVertical: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
});
