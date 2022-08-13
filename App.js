import React from 'react';
import {StatusBar} from 'react-native';
import CallingScreen from './screens/callingscreen';
import CallScreen from './screens/callscreen';
import ContactScreen from './screens/ContactScreen/Index';
import IncomingCallScreen from './screens/incomingcallscreen';

const App = () => {
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      {/* <ContactScreen /> */}
      {/* <CallingScreen /> */}
      {/* <IncomingCallScreen /> */}
      <CallScreen />
    </>
  );
};

export default App;
