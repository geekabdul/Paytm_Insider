import {Dimensions, StyleSheet} from 'react-native';
import {textStyle} from '../../style/text.style';
import {colors} from '../../style/colors.style';
import {fonts} from '../../style/fonts.style';

const {width} = Dimensions.get('window');
export default StyleSheet.create({
  main__container: {
    flex: 1,
    backgroundColor: 'white',
  },
  eventImage: {
    width: width,
    height: width / 1.83,
    // resizeMode: 'contain',
  },
  body__container: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  aboutHeading__container: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgrey',
    alignItems: 'flex-start',
  },
  aboutText: {
    color: 'black',
    ...textStyle.textRegular,
    fontWeight: '700',
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  eventDetails__container: {
    marginVertical: 25,
  },
  eventNameIcon__container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventName: {
    flex: 1,
    flexWrap: 'wrap',
    ...textStyle.text2XLarge,
    color: 'black',
    fontWeight: '700',
  },
  heartIcon__container: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    borderRadius: 10,
  },
  eventDetails__subContainer: {
    marginVertical: 10,
  },
  subDetails__container: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subDetail: {
    marginLeft: 10,
    color: 'black',
  },
  eventGuide__container: {
    marginBottom: 20,
  },
  eventGuide__heading: {
    color: 'black',
    ...textStyle.textXLarge,
    fontWeight: '700',
    marginBottom: 10,
  },
  eventGuid__subContainer: {
    marginLeft: 5,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ageIcon__container: {
    borderWidth: 1.5,
    borderColor: 'black',
    padding: 7,
    marginRight: 10,
  },
  ageIconText: {
    color: 'black',
    fontWeight: '600',
  },
  agePlusIcon: {
    position: 'absolute',
    right: -5,
    backgroundColor: 'white',
    top: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventguideImg: {height: 25, width: 25, marginRight: 20},
  eventGuid__subRightContainer: {
    flex: 1,
  },
  eventGuide__subText: {
    ...textStyle.textLarge,
    color: colors.blackish,
  },
  inviteParent__container: {marginVertical: 10},
  inviteShare__container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inviteFriend__text: {
    color: 'black',
    ...textStyle.textRegular,
    fontWeight: '700',
  },
  share__container: {
    borderWidth: 1,
    borderColor: colors.secondary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  shareText: {
    color: colors.secondary,
  },
  shareSubText: {
    ...textStyle.textSmall,
  },
  aboutEvent__container: {
    marginVertical: 10,
  },
  aboutEvent__text: {
    marginVertical: 15,
    color: 'black',
    ...textStyle.textXLarge,
    fontWeight: '700',
  },
  aboutEvent__description: {
    marginTop: 15,
    color: colors.blackish,
    ...textStyle.textRegular,
    lineHeight: 25,
  },

  termsCondition__container: {
    marginVertical: 20,
    // backgroundColor: 'green',
  },
  termsCondition__subContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'pink',
  },
  termsCondition__text: {
    flex: 1,
    marginLeft: 10,
    color: colors.black,
    ...textStyle.textXLarge,
    fontWeight: '700',
    // backgroundColor: 'red',
  },
  termsCondition__decscription: {
    // backgroundColor: 'blue',
    // marginLeft: 10,
    marginBottom: 30,
  },
  singleCondition__container: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    marginTop: 5,
  },
  bullet: {
    alignSelf: 'flex-start',
    margin: 0,
    padding: 0,
    marginRight: 5,
    color: colors.blackish,
    ...textStyle.text2XLarge,
  },
  conditionPoint: {
    flex: 1,
    flexWrap: 'wrap',
    color: colors.blackish,
  },
  // footer__outerContainer: {
  //   position: 'absolute',
  //   bottom: 0,
  //   width: '100%',
  //   // backgroundColor: 'white',
  //   paddingTop: 10,
  //   // elevation: 10,
  // },
  footer__container: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 20,
    elevation: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer__leftSubContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer__rightSubContainer: {flex: 1},
  footerText: {
    flex: 1,
    marginLeft: 20,
    ...textStyle.textXLarge,
    color: 'black',
    fontWeight: '700',
  },
  recommended__container: {
    marginVertical: 10,
    marginLeft: 20,
  },
  recommended__heading: {
    color: 'black',
    ...textStyle.text4XLarge,
    fontFamily: fonts.KorolevBold,
  },
  eventCards__container: {
    // marginRight: -20,
  },
});
