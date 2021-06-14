import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {Mixpanel} from 'mixpanel-react-native';
import {token as MixpanelToken} from '../../../app.json';

export const ScreenF = ({navigation, name}) => {
  var mixpanel = null;
  useEffect(() => {
    initLog();

    return () => {
      mixpanel.track('Screen F');
    };
  }, []);

  const initLog = async () => {
    //Initilize mixpanel
    mixpanel = await Mixpanel.init(MixpanelToken);
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
          //Track Button click event
          mixpanel.track('Restart Button Click');
          //Navigate to main scree
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
