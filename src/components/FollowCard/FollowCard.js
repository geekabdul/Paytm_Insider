import {View, Text, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import styles from './FollowCard.style';

const FollowCard = React.memo(({data, from}) => {
  from === 'artist' ? console.log(data?.followersStatus, 'artist') : null;

  return (
    <View style={styles.main__container}>
      <ImageBackground
        source={{
          uri: data?.imageURL,
        }}
        style={styles.backgroundstyle}
        imageStyle={styles.imageStyle}>
        <View style={styles.title__container}>
          <Text style={styles.title1}>
            {from === 'artist'
              ? data?.fullName
              : from === 'venue'
              ? data?.venueName
              : null}
          </Text>
          <Text style={styles.title2}>
            {from === 'artist'
              ? data?.eventData?.length
              : from === 'venue'
              ? data?.eventsData?.length
              : null}{' '}
            event
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.footer__container}>
        {data?.followersStatus ? (
          <View style={styles.following__container}>
            <Text style={styles.unfollowing}>Following</Text>
          </View>
        ) : (
          <View style={styles.follow__container}>
            <Text style={styles.follow}>Follow</Text>
          </View>
        )}
      </View>
    </View>
  );
});

export default FollowCard;
