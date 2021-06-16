import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import useApiData from '../../hooks/useApiData';
import {LineSeparator} from '../elements/LineSeparator';
import {SkooveLoader} from '../elements/SkooveLoader';
import {Mixpanel} from 'mixpanel-react-native';
import Preferences from '../../utils/Preferences';
import {token as MixpanelToken} from '../../../app.json';
import appsFlyer from 'react-native-appsflyer';

// eslint-disable-next-line no-unused-vars
var onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
  res => {
    console.log('onInstallConversionData: ', res);
    if (res.type === 'onInstallConversionSuccess') {
      if (JSON.parse(res.data.is_first_launch) === true) {
        if (res.data.af_status === 'Non-organic') {
          var media_source = res.data.media_source;
          var campaign = res.data.campaign;
          console.log(
            'This is first launch and a Non-Organic install. Media source: ' +
              media_source +
              ' Campaign: ' +
              campaign,
          );
        } else if (res.data.af_status === 'Organic') {
          console.log('This is first launch and a Organic Install');
        }
      } else {
        console.log('This is not first launch');
      }
    }
  },
);

// eslint-disable-next-line no-unused-vars
var onAppOpenAttributionCanceller = appsFlyer.onAppOpenAttribution(res => {
  console.log('onAppOpenAttribution', res);
});

export const WelcomeScreen = ({
  navigation,
  introEmoji,
  title,
  buttonTitle,
  nextScreen,
  additionalInfo,
}) => {
  //Create user profile array to use user profile
  const userList = [
    {
      id: '11111101',
      first_name: 'Sethunya',
      last_name: 'Tadas',
      email: 'sethunya@mail.com',
    },
    {
      id: '11111102',
      first_name: 'Judit',
      last_name: 'Bogdan',
      email: 'Judit@mail.com',
    },
    {
      id: '11111103',
      first_name: 'Dilbert',
      last_name: 'Mayson',
      email: 'Dilbert@mail.com',
    },
    {
      id: '11111104',
      first_name: 'Aria',
      last_name: 'Noah',
      email: 'Aria@mail.com',
    },
    {
      id: '11111105',
      first_name: 'Albert',
      last_name: 'Anneka',
      email: 'Albert@mail.com',
    },
    {
      id: '11111106',
      first_name: 'Cadmus',
      last_name: 'Porphyrios',
      email: 'Cadmus@mail.com',
    },
    {
      id: '11111107',
      first_name: 'Hazael',
      last_name: 'Kaye',
      email: 'Hazael@mail.com',
    },
    {
      id: '11111108',
      first_name: 'Marcellina',
      last_name: 'Swati',
      email: 'Marcellina@mail.com',
    },
    {
      id: '11111109',
      first_name: 'Henrik',
      last_name: 'Tone',
      email: 'Henrik@mail.com',
    },
    {
      id: '11111110',
      first_name: 'Rajendra',
      last_name: 'Darina',
      email: 'Rajendra@mail.com',
    },
    {
      id: '11111111',
      first_name: 'Mathilde',
      last_name: 'Kimimela',
      email: 'Mathilde@mail.com',
    },
  ];

  var mixpanel = null;

  const [{data, isLoading}, doFetch] = useApiData();
  useEffect(() => {
    doFetch();

    initLog();
    initAppsFlyer();

    return () => {
      mixpanel.track('Welcome Screen');
    };
  }, []);

  const initLog = async () => {
    //Initilize mixpanel
    mixpanel = await Mixpanel.init(MixpanelToken);
    //Check user stored in local storage
    Preferences.getUser().then(value => {
      console.log('User', value);
      //convert user data in to json object
      var jsonUser = JSON.parse(value);
      if (jsonUser == null) {
        //Generate random number
        const rndInt = randomIntFromInterval(0, 11);
        const userData = userList[rndInt];
        Preferences.setUser(JSON.stringify(userData));
        //Add user data to mixpanel
        mixpanel.identify(userData.id);
        mixpanel.getPeople().set('first_name', userData.first_name);
        mixpanel.getPeople().set('last_name', userData.last_name);
        mixpanel.getPeople().set('email', userData.email);
      }
    });

    mixpanel.timeEvent('Welcome Screen');
  };

  const initAppsFlyer = async () => {
    const options = {
      devKey: 'eNNxhxXyiU6WDZMaLhn8Tj',
      isDebug: true,
      //appId: '1430088267',
      onInstallConversionDataListener: true, //Optional
      onDeepLinkListener: true, //Optional
    };
    var resInitSdk = await appsFlyer.initSdk(options);
    console.log('resInitSdk', resInitSdk);
    logEvent();
  };

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const logEvent = () => {
    const eventName = 'af_test_inital_event';
    const eventValues = {price: '123', amount: '5'};
    appsFlyer.logEvent(
      eventName,
      eventValues,
      result => {
        console.log('logEvent: ' + result);
      },
      error => {
        console.error('logEvent: ' + error);
      },
    );
  };

  /*  const LogLocationPressed = () => {
    appsFlyer.logLocation(32.0853, 34.781769, result => {
      console.log('logLocation: ' + result);
    });
  };

  const LogCrossPromotion = () => {
    appsFlyer.logCrossPromotionImpression('1192323960', 'test', {
      custom_param: 'custom_value',
    });
  }; */

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{introEmoji}</Text>
      <Text style={styles.text} numberOfLines={2}>
        {title}
      </Text>
      <LineSeparator />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Hold on a second, experiments are loading</Text>
          <SkooveLoader />
        </View>
      ) : (
        <Button
          title={'Press Here to Start'}
          onPress={async () => {
            var mixpanel = await Mixpanel.init(MixpanelToken);
            mixpanel.track('Welcome Screen');
            mixpanel.track('Press Here to Start Button Click');

            //Navigate to screen A or screen B
            navigation.navigate(data);
          }}
        />
      )}

      {/* <Button
        onPress={LogCrossPromotion}
        title="Log Location"
        color="#009688"
      />
      <Button onPress={logEvent} title="Log Event" color="#009688" /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '50%',
    top: '25%',
    paddingHorizontal: '10%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  loadingContainer: {
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
