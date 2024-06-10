import {StyleSheet} from 'react-native';
import {textStyle} from '../../style/text.style';
import {fonts} from '../../style/fonts.style';

export default StyleSheet.create({
  main__container: {
    marginLeft: 20,
    marginRight: 15,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  IconHeading__container: {
    flex: 1,
    flexDirection: 'row',

    alignItems: 'flex-start',
  },
  EventIcon_container: {
    backgroundColor: 'white',
    borderRadius: 999,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  imgStyle: {
    height: 30,
    width: 30,
  },
  eventHeadingsContainer: {
    marginLeft: 10,
    flex: 1,
  },
  main__heading: {
    color: 'black',
    ...textStyle.textXLarge,
    // fontWeight: '700',
    fontFamily: fonts.KorolevBold,
  },
  subHeading: {
    ...textStyle.textMedium,

    lineHeight: 20,
  },
  viewAll__container: {
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  viewText: {color: 'black', fontWeight: '500'},
});
