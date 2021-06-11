import React from 'react';
import {StyleSheet, View} from 'react-native';

export const LineSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    marginVertical: '5%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#737373',
  },
});
