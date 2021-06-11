import React, {useEffect} from 'react';
import {SkoovePicker} from '../elements/SkoovePicker';

import {Mixpanel} from 'mixpanel-react-native';

const musicInstruments = [
  {
    id: 'c1b1',
    title: 'Guitar',
    url: 'https://en.wikipedia.org/wiki/Guitar',
  },
  {
    id: '3ac68afc',
    title: 'Piano',
    url: 'https://en.wikipedia.org/wiki/Piano',
  },
  {
    id: '58694a0f',
    title: 'Flute',
    url: 'https://en.wikipedia.org/wiki/Flute',
  },
  {
    id: '3ad53abb28ba',
    title: 'Bass',
    url: 'https://en.wikipedia.org/wiki/Bass',
  },
  {
    id: 'a4f8',
    title: 'Harp',
    url: 'https://en.wikipedia.org/wiki/Harp',
  },
];

export const ScreenA = ({navigation}) => {
  var mixpanel = null;
  useEffect(() => {
    initLog();

    return () => {
      mixpanel.track('Screen A');
    };
  }, []);

  const initLog = async () => {
    mixpanel = await Mixpanel.init('6722115bd61a9655318037ea2104e78c');
    mixpanel.timeEvent('Screen A');
  };

  return (
    <SkoovePicker
      navigation={navigation}
      pickerOptions={musicInstruments}
      pickerTheme={'Musical Instruments'}
    />
  );
};
