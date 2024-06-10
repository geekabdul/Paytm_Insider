import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../style/colors.style';
import {textStyle} from '../../style/text.style';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  main__container: {
    backgroundColor: 'white',
    flex: 1,
  },
  scrollView__container: {
    paddingVertical: 40,
    alignItems: 'center',
    paddingBottom: 90,
  },
  filterBtn__container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 40,
    backgroundColor: colors.secondary,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  filterText: {
    marginLeft: 10,
    color: 'white',
    ...textStyle.textRegular,
    fontWeight: '600',
  },

  // filterMain__container: {
  //   // marginVertical: 10,
  //   // marginHorizontal: 20,
  // },
  filterTop__container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  filterReset__container: {
    // flex: 1,
    borderRadius: 10,
    padding: 15,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
  },
  resetText: {
    color: 'black',
    fontWeight: '600',
  },
  FilterText: {
    // flex: 1,
    ...textStyle.textLarge,
    color: 'black',
    fontWeight: '500',
  },
  doneBtn__container: {
    padding: 15,
    // flex: 1,
    // backgroundColor: 'blue',
  },
  doneText: {
    fontFamily: '',
    ...textStyle.textRegular,
  },
  filterBody__container: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  sortBy__text: {
    fontSize: 11,
  },
  sortBy__container: {
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sortIconTitle__container: {
    flex: 1,
    paddingVertical: 10,
    width: width / 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  sortByTitle__Text: {
    marginTop: 5,
    ...textStyle.textSmall,
    color: 'black',
  },

  eventThisWeek__container: {
    marginVertical: 10,
  },
  ThisWeekText: {
    fontSize: 11,
  },
  eventThisWeek__subContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  day__container: {
    backgroundColor: colors.white,
    width: width / 3.6,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
  },
  todayText: {
    ...textStyle.textSmall,
    color: 'black',
  },
  Date: {
    // ...textStyle.textSmall,
    fontSize: 10,
  },
});
