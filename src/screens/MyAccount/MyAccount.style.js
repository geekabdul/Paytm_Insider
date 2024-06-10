import {StyleSheet} from 'react-native';
import {colors} from '../../style/colors.style';
import {textStyle} from '../../style/text.style';

export default StyleSheet.create({
  main__container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body__container: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  userInfo__container: {
    // marginTop: 20,
  },
  userInfoEdit__container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  userNameEmail__container: {
    flex: 1,
  },
  userName: {
    color: 'black',
    ...textStyle.text3XLarge,
    fontWeight: '600',
  },
  userEmail: {
    alignSelf: 'flex-start',
    color: colors.blackish,
    ...textStyle.textRegular,
    fontWeight: '500',
  },
  edit__parentContainer: {
    flex: 1 / 2,
    alignItems: 'flex-end',
  },

  edit__Container: {
    borderWidth: 0.5,
    borderColor: colors.grey,
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 3,
  },
  editText: {
    ...textStyle.textSmall,
  },
  signIn_parentContainer: {flexDirection: 'row'},
  signInChildContainer: {paddingVertical: 10},
  SignInBtn: {flex: 1 / 2},
  signInText: {fontFamily: '', ...textStyle.textMedium, fontWeight: '700'},
  signInInstruction: {flex: 1, marginLeft: 20, ...textStyle.textSmall},
  stashLocation__container: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  tab__container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    backgroundColor: colors.tab,
    padding: 10,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.lightgrey,
  },
  mapIcon__container: {marginRight: 10},
  tabTitle: {
    color: 'black',
    ...textStyle.textRegular,
    fontWeight: '500',
    width: '80%',
  },
  middle__container: {
    // marginVertical: 5,
  },
  item__container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title__container: {
    flex: 1,
    paddingVertical: 20,
    marginLeft: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTittle: {
    color: 'black',
    ...textStyle.textLarge,
    fontWeight: '500',
  },
  itemTittle_disable: {
    color: 'lightgrey',
    ...textStyle.textLarge,
    fontWeight: '500',
  },
  bottom__container: {
    marginVertical: 15,
  },
  bottomItem__container: {
    marginVertical: 7,
  },
  bottomItem_tittle: {
    color: 'black',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});
