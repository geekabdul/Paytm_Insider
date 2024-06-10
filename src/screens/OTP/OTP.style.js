import {StyleSheet} from 'react-native';
import {colors} from '../../style/colors.style';
import {textStyle} from '../../style/text.style';

export default StyleSheet.create({
  main__container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  OTP__heading: {
    ...textStyle.text3XLarge,
    color: colors.black,
    fontWeight: '500',
  },
  subHeading: {
    marginTop: 5,
    ...textStyle.textMedium,
    color: colors.black,
  },
  email: {
    color: colors.primary,
  },
  OTP__container: {
    marginVertical: 30,
    alignItems: 'center',
  },
  resendOTP: {
    color: colors.violet,
    alignSelf: 'flex-end',
  },
  inputBox: {
    paddingVertical: 0,
    height: 70,
    width: '90%',
  },
  underlineStyleBase: {
    // width: 30,
    // height: 45,
    borderWidth: 2,
    borderRadius: 5,
    color: colors.black,
    ...textStyle.text2XLarge,
  },
  bottomContent__container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  bottomContent: {
    width: '90%',
    textAlign: 'center',
    color: colors.blackish,
    ...textStyle.textRegular,
  },
  contactSupport: {
    color: colors.primary,
  },
});
