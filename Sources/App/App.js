// @flow
import React from 'react';
import { View } from 'react-native';
import { getStore } from 'ReduxManager';

export class App extends React.Component {
  render() {
    const { userStorage } = getStore().getState();

    return <View />;
  }
}

export default App;
