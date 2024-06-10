import {StyleSheet} from 'react-native';
import {colors} from '../../style/colors.style';
import {textStyle} from '../../style/text.style';

export default StyleSheet.create({
  main__container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 20,
  },
  searchBox__container: {
    marginHorizontal: 20,
    borderWidth: 0.5,
    borderColor: 'grey',
    padding: 15,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'sticky', // This is what makes it sticky
    top: 0,
    zIndex: 1,
  },
  inputStyle: {
    borderWidth: 0,
    width: '100%',
    paddingVertical: 0,
  },
  body_container: {
    marginTop: 20,
  },
  trendingHeadin__container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  textTrending: {
    ...textStyle.textLarge,
    fontWeight: '600',
  },
  trendingIcon__container: {
    backgroundColor: colors.secondary,
    borderRadius: 999,
    marginLeft: 5,
    padding: 2,
  },
  lists__container: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  list: {
    marginVertical: 5,
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    borderBottomColor: 'lightgrey',
  },
  listText: {...textStyle.textSmall, color: 'black'},
  resultData__container: {
    marginBottom: 30,
  },
  eventCards__container: {marginLeft: 20},
  artistList__container: {
    marginHorizontal: 20,
  },
  eventList__container: {
    marginHorizontal: 20,
  },
});
