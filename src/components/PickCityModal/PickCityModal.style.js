import {StyleSheet} from 'react-native';
import {textStyle} from '../../style/text.style';
import {colors} from '../../style/colors.style';

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,

  },
  main__Heading: {
    color: colors.black,
    ...textStyle.text4XLarge,
    fontWeight: '700',
  },
  currentLocation__container: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentLocation__text: {
    marginLeft: 10,
    color: colors.primary,
    ...textStyle.textSmall,
  },
  middle__container: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  city__container: {
    marginVertical: 15,
    width: '50%',
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  city: {
    color: colors.black,
    ...textStyle.textRegular,
    fontWeight: '500',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginVertical:20
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  iconContainer: {
    padding: 8,
  },
});
