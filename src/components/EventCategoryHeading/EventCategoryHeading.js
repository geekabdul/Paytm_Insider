import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './EventCategoryHeading.style';

const EventCategoryHeading = ({
  heading,
  subHeading,
  viewAll,
  handleViewBtn,
  headingLogo,
  from,
}) => {
  return (
    <View style={styles.main__container}>
      <View
        style={[
          styles.IconHeading__container,
          !subHeading
            ? internalStyles.HeadingIconCenter
            : internalStyles.HeadingIconFlexStart,
        ]}>
        <View style={styles.EventIcon_container}>
          {from === 'eventCategory' ? (
            <Image source={{uri: headingLogo}} style={styles.imgStyle} />
          ) : (
            <Image source={headingLogo} style={styles.imgStyle} />
          )}
        </View>
        <View style={styles.eventHeadingsContainer}>
          <Text style={styles.main__heading}>{heading}</Text>
          {subHeading ? (
            <Text style={styles.subHeading}>{subHeading}</Text>
          ) : null}
        </View>
      </View>
      {viewAll ? (
        <TouchableOpacity
          style={styles.viewAll__container}
          onPress={handleViewBtn}>
          <Text style={styles.viewText}>VIEW ALL</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default EventCategoryHeading;

const internalStyles = StyleSheet.create({
  HeadingIconCenter: {
    alignItems: 'center',
  },
  HeadingIconFlexStart: {
    alignItems: 'flex-start',
  },
});
