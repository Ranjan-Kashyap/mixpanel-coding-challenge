import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';

import {Mixpanel} from 'mixpanel-react-native';

export const ScreenF = ({navigation, name}) => {
  var mixpanel = null;
  useEffect(() => {
    initLog();

    return () => {
      mixpanel.track('Screen F');
    };
  }, []);

  const initLog = async () => {
    mixpanel = await Mixpanel.init('6722115bd61a9655318037ea2104e78c');
    mixpanel.timeEvent('Screen F');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {'Nice work! \nPress the Button below to learn something new!'}
      </Text>
      <Button
        title="Restart"
        onPress={() => {
          mixpanel.track('Restart Button Click');
          navigation.navigate('Welcome');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginVertical: '20%',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
