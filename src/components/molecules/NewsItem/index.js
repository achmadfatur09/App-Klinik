import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { colors, fonts } from '../../../utils';

export default function NewsItem({blog}) {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>
          {blog.title}
        </Text>
        <Text style={styles.date}>
          {blog.date}
        </Text>
      </View>
      <Image source={{uri:blog.image}} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  titleWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    maxWidth: '90%',
  },
  date: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 4,
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 11,
  },
})