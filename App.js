import React from 'react';
import {StatusBar} from 'react-native';

import Nav from './navigation';

const App = () => {
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <Nav />
    </>
  );
};

export default App;
