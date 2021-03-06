import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Mixpanel} from 'mixpanel-react-native';
import {token as MixpanelToken} from '../../../app.json';

const onItemPick = async (navigation, url, data, pickerTheme) => {
  var mixpanel = await Mixpanel.init(MixpanelToken);

  //Check which screen is open because same component use for both screen
  //Stop active screen time tracking
  if (pickerTheme == 'Musical Instruments') {
    mixpanel.track('Screen A');
  } else {
    mixpanel.track('Screen B');
  }
  //Add log which button user clicked
  mixpanel.track(data.title + ' Button Click', {id: data.id, url: data.url});
  //Open url in browser
  Linking.openURL(url);
  //Navigate to final screen
  navigation.navigate('Final');
};

const PickerItem = ({navigation, title, url, data, pickerTheme}) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => onItemPick(navigation, url, data, pickerTheme)}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

export const SkoovePicker = ({navigation, pickerOptions, pickerTheme}) => (
  <View style={styles.container}>
    <Text
      style={
        styles.description
      }>{`Choose an option from \n"${pickerTheme}"`}</Text>
    <FlatList
      data={pickerOptions}
      renderItem={({item}) => (
        <PickerItem
          title={item.title}
          url={item.url}
          navigation={navigation}
          data={item}
          pickerTheme={pickerTheme}
        />
      )}
      keyExtractor={item => item.id}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginVertical: '20%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  item: {
    backgroundColor: '#a6e0e3',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  description: {
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
  },
});
